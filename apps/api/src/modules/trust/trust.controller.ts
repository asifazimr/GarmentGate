import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AddEvidenceDto,
  AddEvidenceSchema,
  AdminDisputeSummarySchema,
  type AdminDisputeSummary,
  type OpenDisputeDto,
  OpenDisputeSchema,
  type OrderReviews,
  OrderReviewsSchema,
  type PresignEvidenceDto,
  PresignEvidenceSchema,
  type PresignUploadResponse,
  type PublicReview,
  PublicReviewSchema,
  type ResolveDisputeDto,
  ResolveDisputeSchema,
  type SubmitReviewDto,
  SubmitReviewSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { DisputesService } from './disputes.service.js';
import { ReviewsService } from './reviews.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';

const FactoryCodeSchema = z.string().regex(/^MFR-[A-Z]{2}-\d{4,}$/, { error: 'Unknown factory' });

@ApiTags('trust')
@ApiCookieAuth()
@Controller('orders/:code')
export class OrderTrustController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly reviews: ReviewsService,
    private readonly disputes: DisputesService,
  ) {}

  @Get('reviews')
  @ApiOkResponse({ standardSchema: OrderReviewsSchema })
  async orderReviews(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
  ): Promise<OrderReviews> {
    return this.reviews.forOrder(await this.actors.resolve(user.id), code);
  }

  @Post('reviews')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Review the other side of a completed order (once)' })
  async review(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(SubmitReviewSchema)) dto: SubmitReviewDto,
  ): Promise<void> {
    await this.reviews.submit(await this.actors.resolve(user.id), code, dto);
  }

  @Get('dispute')
  @ApiOperation({ summary: 'The latest dispute on the order, as the caller may see it' })
  async dispute(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
  ) {
    return this.disputes.forOrder(await this.actors.resolve(user.id), code);
  }

  @Post('dispute')
  @ApiOperation({ summary: 'Buyer: open a dispute with a reason and evidence' })
  async openDispute(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(OpenDisputeSchema)) dto: OpenDisputeDto,
  ): Promise<{ id: string }> {
    return this.disputes.open(await this.actors.resolve(user.id), code, dto);
  }

  @Post('dispute/uploads')
  @UploadThrottle()
  @ApiOperation({ summary: 'Presigned upload for dispute evidence (photo or PDF)' })
  async presignEvidence(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(PresignEvidenceSchema)) dto: PresignEvidenceDto,
  ): Promise<PresignUploadResponse> {
    return this.disputes.presign(await this.actors.resolve(user.id), code, dto);
  }

  @Post('dispute/evidence')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addEvidence(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(AddEvidenceSchema)) dto: AddEvidenceDto,
  ): Promise<void> {
    await this.disputes.addEvidence(await this.actors.resolve(user.id), code, dto);
  }
}

/** Buyer reviews on a factory's public profile. */
@ApiTags('catalog')
@ApiCookieAuth()
@Roles('BUYER', 'ADMIN')
@Controller('manufacturers/:code/reviews')
export class PublicReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Get()
  @ApiOkResponse({ standardSchema: PublicReviewSchema.array() })
  list(
    @Param('code', new ZodValidationPipe(FactoryCodeSchema)) code: string,
  ): Promise<PublicReview[]> {
    return this.reviews.publicReviews(code);
  }
}

@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/disputes')
export class AdminDisputesController {
  constructor(private readonly disputes: DisputesService) {}

  @Get()
  @ApiOkResponse({ standardSchema: AdminDisputeSummarySchema.array() })
  list(): Promise<AdminDisputeSummary[]> {
    return this.disputes.list();
  }

  @Post(':id/assign')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Take the dispute on (OPEN → UNDER_REVIEW)' })
  assign(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    return this.disputes.assign(admin.id, id);
  }

  @Post(':id/resolve')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Resolve: outcome, optional refund from escrow, where the order goes' })
  resolve(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(ResolveDisputeSchema)) dto: ResolveDisputeDto,
  ): Promise<void> {
    return this.disputes.resolve(admin.id, id, dto);
  }
}
