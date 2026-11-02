import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import {
  type AddShipmentDocumentDto,
  AddShipmentDocumentSchema,
  type BookShipmentDto,
  BookShipmentSchema,
  type GeneratedDocumentType,
  GeneratedDocumentTypeSchema,
  type PresignShipmentDocumentDto,
  PresignShipmentDocumentSchema,
  type PresignUploadResponse,
  type PublishShipmentDocumentDto,
  PublishShipmentDocumentSchema,
} from '@garmentgate/shared';
import type { Response } from 'express';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { ShippingService } from './shipping.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';

@ApiTags('shipping')
@ApiCookieAuth()
@Controller('orders/:code/shipment')
export class ShippingController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly shipping: ShippingService,
  ) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory/staff: book or update the shipment' })
  async book(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookShipmentSchema)) dto: BookShipmentDto,
  ): Promise<void> {
    await this.shipping.book(await this.actors.resolve(user.id), code, dto);
  }

  @Post('uploads')
  @UploadThrottle()
  @ApiOperation({ summary: 'Factory/staff: presigned upload for a shipping document (PDF)' })
  async presign(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(PresignShipmentDocumentSchema)) dto: PresignShipmentDocumentDto,
  ): Promise<PresignUploadResponse> {
    return this.shipping.presign(await this.actors.resolve(user.id), code, dto);
  }

  @Post('documents')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory/staff: attach an uploaded document (hidden from the buyer)' })
  async addDocument(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(AddShipmentDocumentSchema)) dto: AddShipmentDocumentDto,
  ): Promise<void> {
    await this.shipping.addDocument(await this.actors.resolve(user.id), code, dto);
  }

  @Patch('documents/:id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Staff: publish (or hide) an uploaded document for the buyer' })
  publish(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(PublishShipmentDocumentSchema)) dto: PublishShipmentDocumentDto,
  ): Promise<void> {
    return this.shipping.publish(admin.id, code, id, dto);
  }

  @Get('documents/generated/:type')
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'Buyer/staff: a GarmentGate-issued shipping document as PDF' })
  async generated(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('type', new ZodValidationPipe(GeneratedDocumentTypeSchema)) type: GeneratedDocumentType,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { file, name } = await this.shipping.generated(
      await this.actors.resolve(user.id),
      code,
      type,
    );
    res.setHeader('Cache-Control', 'private, no-store');
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: `inline; filename="${name}"`,
    });
  }
}
