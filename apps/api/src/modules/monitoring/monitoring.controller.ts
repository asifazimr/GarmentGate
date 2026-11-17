import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AdminCamera,
  AdminCameraSchema,
  type AssignCamerasDto,
  AssignCamerasSchema,
  type BuyerMonitoring,
  BuyerMonitoringSchema,
  type CreateCameraDto,
  CreateCameraSchema,
  type FactoryCamera,
  FactoryCameraSchema,
  type FactoryOrderMonitoring,
  FactoryOrderMonitoringSchema,
  type MonitoringSettings,
  MonitoringSettingsSchema,
  type ReviewCameraDto,
  ReviewCameraSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { MonitoringService } from './monitoring.service.js';

const Code = new ZodValidationPipe(CodeSchema);
const Id = new ZodValidationPipe(IdSchema);

/** A factory's cameras: connect, submit for review, remove. */
@ApiTags('monitoring')
@ApiCookieAuth()
@Controller('manufacturer/cameras')
@Roles('MANUFACTURER')
export class FactoryCamerasController {
  constructor(
    private readonly monitoring: MonitoringService,
    private readonly context: ManufacturerContextService,
  ) {}

  @Get()
  @ApiOkResponse({ standardSchema: z.array(FactoryCameraSchema) })
  async list(@CurrentUser() user: AuthenticatedUser): Promise<FactoryCamera[]> {
    return this.monitoring.factoryCameras(await this.context.verified(user.id));
  }

  @Post()
  @ApiOperation({ summary: 'Connect a camera: returns its RTMPS ingest URL and stream key' })
  @ApiOkResponse({ standardSchema: FactoryCameraSchema })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateCameraSchema)) dto: CreateCameraDto,
  ): Promise<FactoryCamera> {
    return this.monitoring.createCamera(await this.context.verified(user.id), dto);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Ask staff to review the live picture' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async submit(@CurrentUser() user: AuthenticatedUser, @Param('id', Id) id: string): Promise<void> {
    await this.monitoring.submitCamera(await this.context.verified(user.id), id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: AuthenticatedUser, @Param('id', Id) id: string): Promise<void> {
    await this.monitoring.removeCamera(await this.context.verified(user.id), id);
  }
}

/** An order's monitoring: the buyer adds and watches it, the factory picks the cameras. */
@ApiTags('monitoring')
@ApiCookieAuth()
@Controller()
export class OrderMonitoringController {
  constructor(
    private readonly monitoring: MonitoringService,
    private readonly actors: ChatActorService,
  ) {}

  @Get('orders/:code/monitoring')
  @Roles('BUYER', 'ADMIN')
  @ApiOkResponse({ standardSchema: BuyerMonitoringSchema })
  async view(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', Code) code: string,
  ): Promise<BuyerMonitoring> {
    return this.monitoring.buyerView(await this.actors.resolve(user.id), code);
  }

  @Post('orders/:code/monitoring')
  @Roles('BUYER')
  @ApiOperation({ summary: 'Add video monitoring to the order (a fee, paid like other fees)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async add(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', Code) code: string,
  ): Promise<void> {
    await this.monitoring.addToOrder(await this.actors.resolve(user.id), code);
  }

  @Get('manufacturer/orders/:code/cameras')
  @Roles('MANUFACTURER')
  @ApiOkResponse({ standardSchema: FactoryOrderMonitoringSchema })
  async factoryView(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', Code) code: string,
  ): Promise<FactoryOrderMonitoring> {
    return this.monitoring.factoryOrderView(await this.actors.resolve(user.id), code);
  }

  @Put('manufacturer/orders/:code/cameras')
  @Roles('MANUFACTURER')
  @ApiOperation({ summary: 'Choose which approved cameras show this order' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async assign(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', Code) code: string,
    @Body(new ZodValidationPipe(AssignCamerasSchema)) dto: AssignCamerasDto,
  ): Promise<void> {
    await this.monitoring.assignCameras(await this.actors.resolve(user.id), code, dto);
  }
}

/** Staff: review queue, kill switch and settings. */
@ApiTags('admin')
@ApiCookieAuth()
@Controller('admin/monitoring')
@Roles('ADMIN')
export class AdminMonitoringController {
  constructor(private readonly monitoring: MonitoringService) {}

  @Get('cameras')
  @ApiOkResponse({ standardSchema: z.array(AdminCameraSchema) })
  cameras(): Promise<AdminCamera[]> {
    return this.monitoring.adminCameras();
  }

  @Post('cameras/:id/review')
  @HttpCode(HttpStatus.NO_CONTENT)
  async review(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', Id) id: string,
    @Body(new ZodValidationPipe(ReviewCameraSchema)) dto: ReviewCameraDto,
  ): Promise<void> {
    await this.monitoring.reviewCamera(user.id, id, dto);
  }

  @Post('cameras/:id/disable')
  @ApiOperation({ summary: 'Switch a camera off for buyers at once' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async disable(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', Id) id: string,
  ): Promise<void> {
    await this.monitoring.disableCamera(user.id, id);
  }

  @Get('settings')
  @ApiOkResponse({ standardSchema: MonitoringSettingsSchema })
  settings(): Promise<MonitoringSettings> {
    return this.monitoring.settings();
  }

  @Put('settings')
  @ApiOkResponse({ standardSchema: MonitoringSettingsSchema })
  setSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(MonitoringSettingsSchema)) dto: MonitoringSettings,
  ): Promise<MonitoringSettings> {
    return this.monitoring.setSettings(user.id, dto);
  }
}
