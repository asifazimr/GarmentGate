import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AddCertificationDto,
  AddCertificationSchema,
  type CapacityCalendar,
  CapacityCalendarSchema,
  type Certification,
  type FactoryPhotoDto,
  FactoryPhotoInputSchema,
  IMAGE_MAX_BYTES,
  type ManufacturerCapabilitiesDto,
  ManufacturerCapabilitiesSchema,
  type ManufacturerProduct,
  ManufacturerProductSchema,
  MonthSchema,
  type PresignMediaDto,
  PresignMediaSchema,
  type PresignUploadResponse,
  type ProductDto,
  ProductInputSchema,
  type PublicManufacturer,
  PublicManufacturerSchema,
  type ReorderDto,
  ReorderSchema,
  type UpdateCapacityMonthDto,
  UpdateCapacityMonthSchema,
  UPLOAD_MAX_BYTES,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { FilesService } from '../storage/files.service.js';
import { CapacityService } from './capacity.service.js';
import { ManufacturerContextService } from './manufacturer-context.service.js';
import { ManufacturerProductsService } from './products.service.js';
import { ManufacturerProfileService } from './profile.service.js';

const CalendarQuerySchema = z.object({
  from: MonthSchema.optional(),
  months: z.coerce.number().int().min(1).max(24).default(12),
});

/** Self-service for verified factories. Every response is the manufacturer's own view. */
@ApiTags('manufacturer')
@ApiCookieAuth()
@Roles('MANUFACTURER')
@Controller('manufacturer')
export class ManufacturerController {
  constructor(
    private readonly context: ManufacturerContextService,
    private readonly profile: ManufacturerProfileService,
    private readonly products: ManufacturerProductsService,
    private readonly capacity: CapacityService,
    private readonly files: FilesService,
  ) {}

  // ── Uploads ──
  @Post('uploads')
  @ApiOperation({ summary: 'Presigned POST for product images, factory photos or certificates' })
  async presign(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PresignMediaSchema)) dto: PresignMediaDto,
  ): Promise<PresignUploadResponse> {
    const ctx = await this.context.verified(user.id);
    return this.files.reserveUpload({
      userId: user.id,
      companyId: ctx.companyId,
      purpose: dto.purpose,
      folder: dto.purpose === 'CERTIFICATION' ? 'certifications' : 'originals',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: dto.purpose === 'CERTIFICATION' ? UPLOAD_MAX_BYTES : IMAGE_MAX_BYTES,
    });
  }

  // ── Profile ──
  @Get('profile')
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.profile.view(await this.context.verified(user.id));
  }

  @Put('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ManufacturerCapabilitiesSchema)) dto: ManufacturerCapabilitiesDto,
  ): Promise<void> {
    await this.profile.updateCapabilities(await this.context.verified(user.id), dto);
  }

  @Get('profile/preview')
  @ApiOperation({ summary: 'Your profile exactly as buyers see it (same serializer)' })
  @ApiOkResponse({ standardSchema: PublicManufacturerSchema })
  async preview(@CurrentUser() user: AuthenticatedUser): Promise<PublicManufacturer> {
    return this.profile.preview(await this.context.verified(user.id));
  }

  @Post('photos')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addPhoto(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(FactoryPhotoInputSchema)) dto: FactoryPhotoDto,
  ): Promise<void> {
    await this.profile.addPhoto(await this.context.verified(user.id), dto);
  }

  @Put('photos/order')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reorderPhotos(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ReorderSchema)) dto: ReorderDto,
  ): Promise<void> {
    await this.profile.reorderPhotos(await this.context.verified(user.id), dto);
  }

  @Delete('photos/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removePhoto(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.profile.removePhoto(await this.context.verified(user.id), id);
  }

  @Get('certifications')
  async certifications(@CurrentUser() user: AuthenticatedUser): Promise<Certification[]> {
    return this.profile.certifications(await this.context.verified(user.id));
  }

  @Post('certifications')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addCertification(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(AddCertificationSchema)) dto: AddCertificationDto,
  ): Promise<void> {
    await this.profile.addCertification(await this.context.verified(user.id), dto);
  }

  @Delete('certifications/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCertification(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.profile.removeCertification(await this.context.verified(user.id), id);
  }

  // ── Products ──
  @Get('products')
  async listProducts(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerProduct[]> {
    return this.products.list(await this.context.verified(user.id));
  }

  @Post('products')
  @ApiOkResponse({ standardSchema: ManufacturerProductSchema })
  async createProduct(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ProductInputSchema)) dto: ProductDto,
  ): Promise<ManufacturerProduct> {
    return this.products.create(await this.context.verified(user.id), dto);
  }

  @Get('products/:id')
  @ApiOkResponse({ standardSchema: ManufacturerProductSchema })
  async getProduct(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ManufacturerProduct> {
    return this.products.get(await this.context.verified(user.id), id);
  }

  @Put('products/:id')
  @ApiOkResponse({ standardSchema: ManufacturerProductSchema })
  async updateProduct(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ProductInputSchema)) dto: ProductDto,
  ): Promise<ManufacturerProduct> {
    return this.products.update(await this.context.verified(user.id), id, dto);
  }

  @Delete('products/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProduct(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.products.remove(await this.context.verified(user.id), id);
  }

  @Post('products/:id/images')
  async addProductImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(FactoryPhotoInputSchema)) dto: FactoryPhotoDto,
  ): Promise<ManufacturerProduct> {
    return this.products.addImage(await this.context.verified(user.id), id, dto);
  }

  @Put('products/:id/images/order')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reorderProductImages(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ReorderSchema)) dto: ReorderDto,
  ): Promise<void> {
    await this.products.reorderImages(await this.context.verified(user.id), id, dto);
  }

  @Delete('products/:id/images/:imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProductImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('imageId', ParseUUIDPipe) imageId: string,
  ): Promise<void> {
    await this.products.removeImage(await this.context.verified(user.id), id, imageId);
  }

  // ── Capacity ──
  @Get('capacity')
  @ApiOkResponse({ standardSchema: CapacityCalendarSchema })
  async calendar(
    @CurrentUser() user: AuthenticatedUser,
    @Query(new ZodValidationPipe(CalendarQuerySchema)) query: z.output<typeof CalendarQuerySchema>,
  ): Promise<CapacityCalendar> {
    return this.capacity.calendar(await this.context.verified(user.id), query.from, query.months);
  }

  @Put('capacity/:month')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCapacity(
    @CurrentUser() user: AuthenticatedUser,
    @Param('month', new ZodValidationPipe(MonthSchema)) month: string,
    @Body(new ZodValidationPipe(UpdateCapacityMonthSchema)) dto: UpdateCapacityMonthDto,
  ): Promise<void> {
    await this.capacity.updateMonth(await this.context.verified(user.id), month, dto);
  }
}
