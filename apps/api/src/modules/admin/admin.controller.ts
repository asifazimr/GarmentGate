import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AdminCertification,
  AdminCertificationSchema,
  AdminCertificationsQuerySchema,
  type AdminOverview,
  type AdminOverviewQuery,
  AdminOverviewQuerySchema,
  AdminOverviewSchema,
  type AdminUser,
  AdminUserSchema,
  type AuditEntry,
  AuditEntrySchema,
  type AuditQuery,
  AuditQuerySchema,
  type CertificationStatus,
  type OverrideOrderStatusDto,
  OverrideOrderStatusSchema,
  type RejectCertificationDto,
  RejectCertificationSchema,
  type SuspendUserDto,
  SuspendUserSchema,
  type WarnUserDto,
  WarnUserSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { OrdersService } from '../orders/orders.service.js';
import { AdminAuditService } from './admin-audit.service.js';
import { AdminCertificationsService } from './admin-certifications.service.js';
import { AdminOverviewService } from './admin-overview.service.js';
import { AdminUsersService } from './admin-users.service.js';

@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly overviewService: AdminOverviewService,
    private readonly users: AdminUsersService,
    private readonly auditLog: AdminAuditService,
    private readonly certifications: AdminCertificationsService,
    private readonly orders: OrdersService,
    private readonly actors: ChatActorService,
  ) {}

  @Get('overview')
  @ApiOkResponse({ standardSchema: AdminOverviewSchema })
  overview(
    @Query(new ZodValidationPipe(AdminOverviewQuerySchema)) query: AdminOverviewQuery,
  ): Promise<AdminOverview> {
    return this.overviewService.overview(query.months);
  }

  // ── Users ─────────────────────────────────────────────────────────────────

  @Get('users')
  @ApiOkResponse({ standardSchema: z.array(AdminUserSchema) })
  listUsers(): Promise<AdminUser[]> {
    return this.users.list();
  }

  @Post('users/:id/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Suspend an account and revoke its sessions' })
  suspend(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(SuspendUserSchema)) dto: SuspendUserDto,
  ): Promise<void> {
    return this.users.suspend(admin.id, id, dto);
  }

  @Post('users/:id/reactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  reactivate(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    return this.users.reactivate(admin.id, id);
  }

  @Post('users/:id/warn')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Issue a warning with a note (shown to the user)' })
  warn(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(WarnUserSchema)) dto: WarnUserDto,
  ): Promise<void> {
    return this.users.warn(admin.id, id, dto);
  }

  // ── Audit log ─────────────────────────────────────────────────────────────

  @Get('audit')
  @ApiOkResponse({ standardSchema: z.array(AuditEntrySchema) })
  audit(@Query(new ZodValidationPipe(AuditQuerySchema)) query: AuditQuery): Promise<AuditEntry[]> {
    return this.auditLog.list(query);
  }

  // ── Certifications ────────────────────────────────────────────────────────

  @Get('certifications')
  @ApiOkResponse({ standardSchema: z.array(AdminCertificationSchema) })
  listCertifications(
    @Query(new ZodValidationPipe(AdminCertificationsQuerySchema))
    query: {
      status?: CertificationStatus;
    },
  ): Promise<AdminCertification[]> {
    return this.certifications.list(query.status);
  }

  @Post('certifications/:id/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  verifyCertification(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    return this.certifications.verify(admin.id, id);
  }

  @Post('certifications/:id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  rejectCertification(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(RejectCertificationSchema)) dto: RejectCertificationDto,
  ): Promise<void> {
    return this.certifications.reject(admin.id, id, dto);
  }

  // ── Orders ────────────────────────────────────────────────────────────────

  @Post('orders/:code/override')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Move an order outside the normal flow, with a reason (audited)' })
  async override(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(OverrideOrderStatusSchema)) dto: OverrideOrderStatusDto,
  ): Promise<void> {
    await this.orders.override(await this.actors.resolve(admin.id), code, dto);
  }
}
