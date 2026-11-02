import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import {
  type AddMilestoneMediaDto,
  AddMilestoneMediaSchema,
  type MilestoneUpdateDto,
  MilestoneUpdateSchema,
  type OrderTransitionDto,
  OrderTransitionSchema,
  type PresignOrderMediaDto,
  PresignOrderMediaSchema,
  type PresignUploadResponse,
  type ProductionStage,
  ProductionStageSchema,
  type ReorderOrderDto,
  ReorderOrderSchema,
  type RequestSampleDto,
  RequestSampleSchema,
  type SampleDecisionDto,
  SampleDecisionSchema,
  type ShipSampleDto,
  ShipSampleSchema,
} from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from './order-params.js';
import { OrdersService } from './orders.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';

const SideSchema = z.object({ side: z.enum(['buyer', 'manufacturer']).optional() });

/**
 * Orders for all three roles. What each caller sees and may do is decided per order by the
 * service: buyers their company's orders at GarmentGate's price, factories theirs at their own
 * price, staff everything. The shared state machine decides which moves are allowed.
 */
@ApiTags('orders')
@ApiCookieAuth()
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly orders: OrdersService,
  ) {}

  @Get()
  async list(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.list(await this.actors.resolve(user.id));
  }

  @Get(':code')
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
  ) {
    return this.orders.detail(await this.actors.resolve(user.id), code);
  }

  @Post(':code/transition')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Move the order to its next status (validated by the state machine)' })
  async transition(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(OrderTransitionSchema)) dto: OrderTransitionDto,
  ): Promise<void> {
    await this.orders.transition(await this.actors.resolve(user.id), code, dto);
  }

  @Post(':code/samples')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Buyer: request a sample (starts or restarts sampling)' })
  async requestSample(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(RequestSampleSchema)) dto: RequestSampleDto,
  ): Promise<void> {
    await this.orders.requestSample(await this.actors.resolve(user.id), code, dto);
  }

  @Post(':code/samples/:id/ship')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory: the sample is on its way' })
  async shipSample(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(ShipSampleSchema)) dto: ShipSampleDto,
  ): Promise<void> {
    await this.orders.shipSample(await this.actors.resolve(user.id), code, id, dto);
  }

  @Post(':code/samples/:id/decision')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Buyer: approve the sample, or ask for changes with comments and photos',
  })
  async decideSample(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(SampleDecisionSchema)) dto: SampleDecisionDto,
  ): Promise<void> {
    await this.orders.decideSample(await this.actors.resolve(user.id), code, id, dto);
  }

  @Post(':code/milestones/:stage')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory: update a production stage' })
  async updateMilestone(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('stage', new ZodValidationPipe(ProductionStageSchema)) stage: ProductionStage,
    @Body(new ZodValidationPipe(MilestoneUpdateSchema)) dto: MilestoneUpdateDto,
  ): Promise<void> {
    await this.orders.updateMilestone(await this.actors.resolve(user.id), code, stage, dto);
  }

  @Post(':code/milestones/:stage/media')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory: attach an uploaded photo or video to a stage' })
  async addMedia(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('stage', new ZodValidationPipe(ProductionStageSchema)) stage: ProductionStage,
    @Body(new ZodValidationPipe(AddMilestoneMediaSchema)) dto: AddMilestoneMediaDto,
  ): Promise<void> {
    await this.orders.addMilestoneMedia(await this.actors.resolve(user.id), code, stage, dto);
  }

  @Post(':code/uploads')
  @UploadThrottle()
  @ApiOperation({ summary: 'Presigned POST: factory production media, buyer sample photos' })
  async presign(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(PresignOrderMediaSchema)) dto: PresignOrderMediaDto,
  ): Promise<PresignUploadResponse> {
    return this.orders.presign(await this.actors.resolve(user.id), code, dto);
  }

  @Post(':code/reorder')
  @ApiOperation({ summary: 'Buyer: reorder a completed order (creates a draft)' })
  async reorder(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(ReorderOrderSchema)) dto: ReorderOrderDto,
  ): Promise<{ code: string }> {
    return this.orders.reorder(await this.actors.resolve(user.id), code, dto);
  }

  @Get(':code/purchase-order')
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'Your purchase order as a PDF (staff choose the side)' })
  async purchaseOrder(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Query(new ZodValidationPipe(SideSchema)) query: z.output<typeof SideSchema>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { file, name } = await this.orders.purchaseOrder(
      await this.actors.resolve(user.id),
      code,
      query.side,
    );
    res.setHeader('Cache-Control', 'private, no-store');
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: `inline; filename="${name}"`,
    });
  }
}
