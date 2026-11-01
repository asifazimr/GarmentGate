import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type BuyerDashboard,
  BuyerDashboardSchema,
  type ProductRequestDto,
  type ProductRequestResult,
  ProductRequestResultSchema,
  ProductRequestSchema,
  type SavedIndex,
  SavedIndexSchema,
  type Shortlist,
  type ShortlistItemInput,
  ShortlistItemInputSchema,
  type ShortlistNameDto,
  ShortlistNameSchema,
  ShortlistSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from './buyer-context.service.js';
import { BuyerDashboardService } from './dashboard.service.js';
import { ProductRequestsService } from './product-requests.service.js';
import { ShortlistsService } from './shortlists.service.js';

@ApiTags('buyer')
@ApiCookieAuth()
@Roles('BUYER')
@Controller()
export class BuyerController {
  constructor(
    private readonly context: BuyerContextService,
    private readonly shortlists: ShortlistsService,
    private readonly requests: ProductRequestsService,
    private readonly dashboard: BuyerDashboardService,
  ) {}

  @Get('buyer/dashboard')
  @ApiOkResponse({ standardSchema: BuyerDashboardSchema })
  async getDashboard(@CurrentUser() user: AuthenticatedUser): Promise<BuyerDashboard> {
    return this.dashboard.get(await this.context.verified(user.id));
  }

  @Post('catalog/products/:id/request')
  @ApiOperation({ summary: 'Request a quote or order a sample of a catalog product' })
  @ApiOkResponse({ standardSchema: ProductRequestResultSchema })
  async request(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ProductRequestSchema)) dto: ProductRequestDto,
  ): Promise<ProductRequestResult> {
    return this.requests.create(await this.context.verified(user.id), id, dto);
  }

  // ── Shortlists ──
  @Get('shortlists')
  @ApiOkResponse({ standardSchema: ShortlistSchema.array() })
  async lists(@CurrentUser() user: AuthenticatedUser): Promise<Shortlist[]> {
    return this.shortlists.list(await this.context.verified(user.id));
  }

  @Get('shortlists/saved')
  @ApiOperation({ summary: 'Which lists contain which products and factories (for heart buttons)' })
  @ApiOkResponse({ standardSchema: SavedIndexSchema })
  async saved(@CurrentUser() user: AuthenticatedUser): Promise<SavedIndex> {
    return this.shortlists.savedIndex(await this.context.verified(user.id));
  }

  @Post('shortlists')
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ShortlistNameSchema)) dto: ShortlistNameDto,
  ): Promise<{ id: string }> {
    return this.shortlists.create(await this.context.verified(user.id), dto.name);
  }

  @Patch('shortlists/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rename(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ShortlistNameSchema)) dto: ShortlistNameDto,
  ): Promise<void> {
    await this.shortlists.rename(await this.context.verified(user.id), id, dto.name);
  }

  @Delete('shortlists/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.shortlists.remove(await this.context.verified(user.id), id);
  }

  @Post('shortlists/:id/items')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addItem(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ShortlistItemInputSchema)) dto: ShortlistItemInput,
  ): Promise<void> {
    await this.shortlists.addItem(await this.context.verified(user.id), id, dto);
  }

  @Post('shortlists/:id/items/remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItem(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ShortlistItemInputSchema)) dto: ShortlistItemInput,
  ): Promise<void> {
    await this.shortlists.removeItem(await this.context.verified(user.id), id, dto);
  }
}
