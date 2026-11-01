import { randomUUID } from 'node:crypto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from '@node-rs/argon2';
import type { AuthUser, LoginDto, RegisterDto, ResetPasswordDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { UserTokenType } from '../../generated/prisma/client.js';
import { AuditService } from '../audit/audit.service.js';
import { MailService } from '../mail/mail.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { authUserInclude, toAuthUser, toClaims, type UserWithCompany } from './auth-user.mapper.js';
import {
  generateOpaqueToken,
  hashOpaqueToken,
  type IssuedTokens,
  TokenService,
} from './token.service.js';

export interface RequestMeta {
  ip?: string | undefined;
  userAgent?: string | undefined;
}

export interface AuthResult {
  user: AuthUser;
  tokens: IssuedTokens;
}

const EMAIL_VERIFICATION_TTL_HOURS = 24;
const PASSWORD_RESET_TTL_MINUTES = 60;
/** A just-rotated refresh token may be replayed this long (parallel tabs) without counting as theft. */
const REFRESH_REUSE_GRACE_MS = 30_000;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  /** Verified against when the email is unknown, so response time doesn't reveal accounts. */
  private readonly dummyHash = hash('timing-equaliser-password');

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService,
    private readonly mail: MailService,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async register(dto: RegisterDto, meta: RequestMeta): Promise<AuthResult> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('An account with this email already exists');

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

  async login(dto: LoginDto, meta: RequestMeta): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: authUserInclude,
    });
    const valid =
      user && !user.deletedAt
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

  /** Rotates the refresh token. Replaying a rotated token outside the grace window revokes the family. */
  async refresh(refreshToken: string, meta: RequestMeta): Promise<AuthResult> {
    const session = await this.prisma.session.findUnique({
      where: { refreshTokenHash: hashOpaqueToken(refreshToken) },
    });
    if (!session) throw new UnauthorizedException('Session expired');

    const now = Date.now();
    if (session.revokedAt) {
      const withinGrace =
        session.replacedById !== null && now - session.revokedAt.getTime() < REFRESH_REUSE_GRACE_MS;
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
    if (session.expiresAt.getTime() <= now) throw new UnauthorizedException('Session expired');

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

  async logout(refreshToken: string | null): Promise<void> {
    if (!refreshToken) return;
    await this.prisma.session.updateMany({
      where: { refreshTokenHash: hashOpaqueToken(refreshToken), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async me(userId: string): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: authUserInclude,
    });
    if (!user || user.deletedAt) throw new UnauthorizedException('Not signed in');
    return toAuthUser(user);
  }

  /** New access token with current claims (after KYC or email-verification changes). */
  async reissueAccessToken(userId: string): Promise<string> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: authUserInclude,
    });
    return this.tokens.signAccessToken(toClaims(user));
  }

  async verifyEmail(token: string): Promise<void> {
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

  async resendVerification(userId: string): Promise<void> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (user.emailVerifiedAt) return;
    await this.sendVerificationEmail(user);
  }

  /** Always succeeds so the response never reveals whether an account exists. */
  async forgotPassword(email: string, meta: RequestMeta): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.deletedAt || user.status !== 'ACTIVE') return;

    const token = await this.createUserToken(
      user.id,
      'PASSWORD_RESET',
      PASSWORD_RESET_TTL_MINUTES * 60_000,
    );
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

  async resetPassword(dto: ResetPasswordDto, meta: RequestMeta): Promise<void> {
    const record = await this.consumeToken(dto.token, 'PASSWORD_RESET');
    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: record.userId },
        // Following the emailed link proves the user owns the inbox.
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

  // ── internals ─────────────────────────────────────────────────────────────

  private async startSession(user: UserWithCompany, meta: RequestMeta): Promise<AuthResult> {
    const tokens = await this.newTokens(user);
    await this.prisma.session.create({
      data: this.sessionData(user.id, randomUUID(), tokens, meta),
    });
    return { user: toAuthUser(user), tokens };
  }

  private async newTokens(user: UserWithCompany): Promise<IssuedTokens> {
    return {
      accessToken: await this.tokens.signAccessToken(toClaims(user)),
      refreshToken: generateOpaqueToken(),
      refreshExpiresAt: new Date(Date.now() + this.tokens.refreshTtlMs),
    };
  }

  private sessionData(userId: string, familyId: string, tokens: IssuedTokens, meta: RequestMeta) {
    return {
      userId,
      familyId,
      refreshTokenHash: hashOpaqueToken(tokens.refreshToken),
      expiresAt: tokens.refreshExpiresAt,
      ip: meta.ip ?? null,
      userAgent: meta.userAgent?.slice(0, 500) ?? null,
    };
  }

  private assertActive(user: { status: string; deletedAt: Date | null }): void {
    if (user.deletedAt || user.status !== 'ACTIVE') {
      throw new ForbiddenException('This account is not active. Contact support.');
    }
  }

  private async sendVerificationEmail(user: { id: string; email: string; firstName: string }) {
    const token = await this.createUserToken(
      user.id,
      'EMAIL_VERIFICATION',
      EMAIL_VERIFICATION_TTL_HOURS * 3_600_000,
    );
    await this.mail.send('verify-email', user.email, {
      firstName: user.firstName,
      verifyUrl: this.webUrl('/verify-email', token),
      expiresInHours: EMAIL_VERIFICATION_TTL_HOURS,
    });
  }

  /** Invalidates earlier unused tokens of the same type, so only the newest link works. */
  private async createUserToken(
    userId: string,
    type: UserTokenType,
    ttlMs: number,
  ): Promise<string> {
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

  private async consumeToken(token: string, type: UserTokenType) {
    const record = await this.prisma.userToken.findUnique({
      where: { tokenHash: hashOpaqueToken(token) },
      include: { user: true },
    });
    if (record?.type !== type || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedException('This link is invalid or has expired');
    }
    // Atomic claim: a token can only be used once even under concurrent requests.
    const claimed = await this.prisma.userToken.updateMany({
      where: { id: record.id, usedAt: null },
      data: { usedAt: new Date() },
    });
    if (claimed.count === 0) throw new UnauthorizedException('This link is invalid or has expired');
    this.logger.debug(`Consumed ${type} token for user ${record.userId}`);
    return record;
  }

  private webUrl(path: string, token: string): string {
    const url = new URL(path, this.config.get('WEB_APP_URL', { infer: true }));
    url.searchParams.set('token', token);
    return url.toString();
  }
}
