var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
import { randomUUID } from 'node:crypto';
import { ConflictException, ForbiddenException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from '@node-rs/argon2';
import { AuditService } from '../audit/audit.service.js';
import { MailService } from '../mail/mail.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { authUserInclude, toAuthUser, toClaims } from './auth-user.mapper.js';
import { generateOpaqueToken, hashOpaqueToken, TokenService, } from './token.service.js';
const EMAIL_VERIFICATION_TTL_HOURS = 24;
const PASSWORD_RESET_TTL_MINUTES = 60;
const REFRESH_REUSE_GRACE_MS = 30_000;
let AuthService = AuthService_1 = class AuthService {
    prisma;
    tokens;
    mail;
    audit;
    config;
    logger = new Logger(AuthService_1.name);
    dummyHash = hash('timing-equaliser-password');
    constructor(prisma, tokens, mail, audit, config) {
        this.prisma = prisma;
        this.tokens = tokens;
        this.mail = mail;
        this.audit = audit;
        this.config = config;
    }
    async register(dto, meta) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new ConflictException('An account with this email already exists');
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash: await hash(dto.password),
                role: dto.role,
                firstName: dto.firstName,
                lastName: dto.lastName,
                locale: dto.locale,
            },
            include: authUserInclude,
        });
        await this.audit.log({
            actorUserId: user.id,
            action: 'auth.registered',
            entityType: 'User',
            entityId: user.id,
            ...meta,
        });
        await this.sendVerificationEmail(user);
        return this.startSession(user, meta);
    }
    async createStaffUser(adminId, input) {
        const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
        if (existing)
            throw new ConflictException('An account with this email already exists');
        const user = await this.prisma.user.create({
            data: {
                ...input,
                passwordHash: await hash(randomUUID()),
                emailVerifiedAt: new Date(),
            },
        });
        const token = await this.createUserToken(user.id, 'PASSWORD_RESET', PASSWORD_RESET_TTL_MINUTES * 60_000);
        await this.mail.send('reset-password', user.email, {
            firstName: user.firstName,
            resetUrl: this.webUrl('/reset-password', token),
            expiresInMinutes: PASSWORD_RESET_TTL_MINUTES,
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'auth.staff_created',
            entityType: 'User',
            entityId: user.id,
            metadata: { role: input.role },
        });
        return { id: user.id };
    }
    async login(dto, meta) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: authUserInclude,
        });
        const valid = user && !user.deletedAt
            ? await verify(user.passwordHash, dto.password)
            : await verify(await this.dummyHash, dto.password).then(() => false);
        if (!user || !valid) {
            await this.audit.log({
                action: 'auth.login_failed',
                entityType: 'User',
                entityId: user?.id ?? null,
                metadata: { email: dto.email },
                ...meta,
            });
            throw new UnauthorizedException('Incorrect email or password');
        }
        this.assertActive(user);
        await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
        await this.audit.log({
            actorUserId: user.id,
            action: 'auth.login',
            entityType: 'User',
            entityId: user.id,
            ...meta,
        });
        return this.startSession(user, meta);
    }
    async refresh(refreshToken, meta) {
        const session = await this.prisma.session.findUnique({
            where: { refreshTokenHash: hashOpaqueToken(refreshToken) },
        });
        if (!session)
            throw new UnauthorizedException('Session expired');
        const now = Date.now();
        if (session.revokedAt) {
            const withinGrace = session.replacedById !== null && now - session.revokedAt.getTime() < REFRESH_REUSE_GRACE_MS;
            if (!withinGrace) {
                await this.prisma.session.updateMany({
                    where: { familyId: session.familyId, revokedAt: null },
                    data: { revokedAt: new Date() },
                });
                await this.audit.log({
                    actorUserId: session.userId,
                    action: 'auth.refresh_reuse_detected',
                    entityType: 'Session',
                    entityId: session.familyId,
                    ...meta,
                });
                throw new UnauthorizedException('Session expired');
            }
        }
        if (session.expiresAt.getTime() <= now)
            throw new UnauthorizedException('Session expired');
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: session.userId },
            include: authUserInclude,
        });
        this.assertActive(user);
        const tokens = await this.newTokens(user);
        await this.prisma.$transaction(async (tx) => {
            const next = await tx.session.create({
                data: this.sessionData(user.id, session.familyId, tokens, meta),
            });
            if (!session.revokedAt) {
                await tx.session.update({
                    where: { id: session.id },
                    data: { revokedAt: new Date(), replacedById: next.id, lastUsedAt: new Date() },
                });
            }
        });
        return { user: toAuthUser(user), tokens };
    }
    async logout(refreshToken) {
        if (!refreshToken)
            return;
        await this.prisma.session.updateMany({
            where: { refreshTokenHash: hashOpaqueToken(refreshToken), revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    async updatePreferences(userId, dto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.locale !== undefined && { locale: dto.locale }),
                ...(dto.displayCurrency !== undefined && { displayCurrency: dto.displayCurrency }),
            },
            include: authUserInclude,
        });
        return toAuthUser(user);
    }
    async me(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: authUserInclude,
        });
        if (!user || user.deletedAt)
            throw new UnauthorizedException('Not signed in');
        return toAuthUser(user);
    }
    async reissueAccessToken(userId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: authUserInclude,
        });
        return this.tokens.signAccessToken(toClaims(user));
    }
    async verifyEmail(token) {
        const record = await this.consumeToken(token, 'EMAIL_VERIFICATION');
        await this.prisma.user.update({
            where: { id: record.userId },
            data: { emailVerifiedAt: new Date() },
        });
        await this.audit.log({
            actorUserId: record.userId,
            action: 'auth.email_verified',
            entityType: 'User',
            entityId: record.userId,
        });
    }
    async resendVerification(userId) {
        const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
        if (user.emailVerifiedAt)
            return;
        await this.sendVerificationEmail(user);
    }
    async forgotPassword(email, meta) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.deletedAt || user.status !== 'ACTIVE')
            return;
        const token = await this.createUserToken(user.id, 'PASSWORD_RESET', PASSWORD_RESET_TTL_MINUTES * 60_000);
        await this.mail.send('reset-password', user.email, {
            firstName: user.firstName,
            resetUrl: this.webUrl('/reset-password', token),
            expiresInMinutes: PASSWORD_RESET_TTL_MINUTES,
        });
        await this.audit.log({
            actorUserId: user.id,
            action: 'auth.password_reset_requested',
            entityType: 'User',
            entityId: user.id,
            ...meta,
        });
    }
    async resetPassword(dto, meta) {
        const record = await this.consumeToken(dto.token, 'PASSWORD_RESET');
        const now = new Date();
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: record.userId },
                data: {
                    passwordHash: await hash(dto.password),
                    emailVerifiedAt: record.user.emailVerifiedAt ?? now,
                },
            }),
            this.prisma.session.updateMany({
                where: { userId: record.userId, revokedAt: null },
                data: { revokedAt: now },
            }),
            this.prisma.userToken.updateMany({
                where: { userId: record.userId, type: 'PASSWORD_RESET', usedAt: null },
                data: { usedAt: now },
            }),
        ]);
        await this.audit.log({
            actorUserId: record.userId,
            action: 'auth.password_reset',
            entityType: 'User',
            entityId: record.userId,
            ...meta,
        });
    }
    async startSession(user, meta) {
        const tokens = await this.newTokens(user);
        await this.prisma.session.create({
            data: this.sessionData(user.id, randomUUID(), tokens, meta),
        });
        return { user: toAuthUser(user), tokens };
    }
    async newTokens(user) {
        return {
            accessToken: await this.tokens.signAccessToken(toClaims(user)),
            refreshToken: generateOpaqueToken(),
            refreshExpiresAt: new Date(Date.now() + this.tokens.refreshTtlMs),
        };
    }
    sessionData(userId, familyId, tokens, meta) {
        return {
            userId,
            familyId,
            refreshTokenHash: hashOpaqueToken(tokens.refreshToken),
            expiresAt: tokens.refreshExpiresAt,
            ip: meta.ip ?? null,
            userAgent: meta.userAgent?.slice(0, 500) ?? null,
        };
    }
    assertActive(user) {
        if (user.deletedAt || user.status !== 'ACTIVE') {
            throw new ForbiddenException('This account is not active. Contact support.');
        }
    }
    async sendVerificationEmail(user) {
        const token = await this.createUserToken(user.id, 'EMAIL_VERIFICATION', EMAIL_VERIFICATION_TTL_HOURS * 3_600_000);
        await this.mail.send('verify-email', user.email, {
            firstName: user.firstName,
            verifyUrl: this.webUrl('/verify-email', token),
            expiresInHours: EMAIL_VERIFICATION_TTL_HOURS,
        });
    }
    async createUserToken(userId, type, ttlMs) {
        const token = generateOpaqueToken();
        await this.prisma.$transaction([
            this.prisma.userToken.updateMany({
                where: { userId, type, usedAt: null },
                data: { usedAt: new Date() },
            }),
            this.prisma.userToken.create({
                data: {
                    userId,
                    type,
                    tokenHash: hashOpaqueToken(token),
                    expiresAt: new Date(Date.now() + ttlMs),
                },
            }),
        ]);
        return token;
    }
    async consumeToken(token, type) {
        const record = await this.prisma.userToken.findUnique({
            where: { tokenHash: hashOpaqueToken(token) },
            include: { user: true },
        });
        if (record?.type !== type || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
            throw new UnauthorizedException('This link is invalid or has expired');
        }
        const claimed = await this.prisma.userToken.updateMany({
            where: { id: record.id, usedAt: null },
            data: { usedAt: new Date() },
        });
        if (claimed.count === 0)
            throw new UnauthorizedException('This link is invalid or has expired');
        this.logger.debug(`Consumed ${type} token for user ${record.userId}`);
        return record;
    }
    webUrl(path, token) {
        const url = new URL(path, this.config.get('WEB_APP_URL', { infer: true }));
        url.searchParams.set('token', token);
        return url.toString();
    }
};
AuthService = AuthService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        TokenService,
        MailService,
        AuditService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map