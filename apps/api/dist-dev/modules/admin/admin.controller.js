var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminCertificationSchema, AdminCertificationsQuerySchema, AdminOverviewQuerySchema, AdminOverviewSchema, AdminUserSchema, AuditEntrySchema, AuditQuerySchema, OverrideOrderStatusSchema, RejectCertificationSchema, SuspendUserSchema, WarnUserSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { OrdersService } from '../orders/orders.service.js';
import { AdminAuditService } from './admin-audit.service.js';
import { AdminCertificationsService } from './admin-certifications.service.js';
import { AdminOverviewService } from './admin-overview.service.js';
import { AdminUsersService } from './admin-users.service.js';
let AdminController = class AdminController {
    overviewService;
    users;
    auditLog;
    certifications;
    orders;
    actors;
    constructor(overviewService, users, auditLog, certifications, orders, actors) {
        this.overviewService = overviewService;
        this.users = users;
        this.auditLog = auditLog;
        this.certifications = certifications;
        this.orders = orders;
        this.actors = actors;
    }
    overview(query) {
        return this.overviewService.overview(query.months);
    }
    listUsers() {
        return this.users.list();
    }
    suspend(admin, id, dto) {
        return this.users.suspend(admin.id, id, dto);
    }
    reactivate(admin, id) {
        return this.users.reactivate(admin.id, id);
    }
    warn(admin, id, dto) {
        return this.users.warn(admin.id, id, dto);
    }
    audit(query) {
        return this.auditLog.list(query);
    }
    listCertifications(query) {
        return this.certifications.list(query.status);
    }
    verifyCertification(admin, id) {
        return this.certifications.verify(admin.id, id);
    }
    rejectCertification(admin, id, dto) {
        return this.certifications.reject(admin.id, id, dto);
    }
    async override(admin, code, dto) {
        await this.orders.override(await this.actors.resolve(admin.id), code, dto);
    }
};
__decorate([
    Get('overview'),
    ApiOkResponse({ standardSchema: AdminOverviewSchema }),
    __param(0, Query(new ZodValidationPipe(AdminOverviewQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "overview", null);
__decorate([
    Get('users'),
    ApiOkResponse({ standardSchema: z.array(AdminUserSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listUsers", null);
__decorate([
    Post('users/:id/suspend'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Suspend an account and revoke its sessions' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(SuspendUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspend", null);
__decorate([
    Post('users/:id/reactivate'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reactivate", null);
__decorate([
    Post('users/:id/warn'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Issue a warning with a note (shown to the user)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(WarnUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "warn", null);
__decorate([
    Get('audit'),
    ApiOkResponse({ standardSchema: z.array(AuditEntrySchema) }),
    __param(0, Query(new ZodValidationPipe(AuditQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "audit", null);
__decorate([
    Get('certifications'),
    ApiOkResponse({ standardSchema: z.array(AdminCertificationSchema) }),
    __param(0, Query(new ZodValidationPipe(AdminCertificationsQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listCertifications", null);
__decorate([
    Post('certifications/:id/verify'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifyCertification", null);
__decorate([
    Post('certifications/:id/reject'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(RejectCertificationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectCertification", null);
__decorate([
    Post('orders/:code/override'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Move an order outside the normal flow, with a reason (audited)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(OverrideOrderStatusSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "override", null);
AdminController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [AdminOverviewService,
        AdminUsersService,
        AdminAuditService,
        AdminCertificationsService,
        OrdersService,
        ChatActorService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map