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
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AddCertificationDto,
  AddCertificationSchema,
  type AddCompanyDocumentDto,
  AddCompanyDocumentSchema,
  type PresignUploadDto,
  type PresignUploadResponse,
  PresignUploadResponseSchema,
  PresignUploadSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { KycService } from './kyc.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';

@ApiTags('kyc')
@ApiCookieAuth()
@Controller('kyc')
export class KycController {
  constructor(private readonly kyc: KycService) {}

  @Post('uploads')
  @UploadThrottle()
  @Roles('BUYER', 'MANUFACTURER')
  @ApiOperation({
    summary: 'Get a presigned POST to upload a document straight to storage',
    description:
      'POST the file as multipart/form-data to `url`, with every entry of `fields` before `file`.',
  })
  @ApiOkResponse({ standardSchema: PresignUploadResponseSchema })
  presign(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PresignUploadSchema)) dto: PresignUploadDto,
  ): Promise<PresignUploadResponse> {
    return this.kyc.presignUpload(user.id, dto);
  }

  @Post('documents')
  @Roles('BUYER', 'MANUFACTURER')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Attach an uploaded file as a business license, export registration, …',
  })
  addDocument(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(AddCompanyDocumentSchema)) dto: AddCompanyDocumentDto,
  ): Promise<void> {
    return this.kyc.addDocument(user.id, dto);
  }

  @Delete('documents/:id')
  @Roles('BUYER', 'MANUFACTURER')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeDocument(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.kyc.removeDocument(user.id, id);
  }

  @Post('certifications')
  @Roles('MANUFACTURER')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Attach an uploaded certificate (BSCI, WRAP, GOTS, …)' })
  addCertification(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(AddCertificationSchema)) dto: AddCertificationDto,
  ): Promise<void> {
    return this.kyc.addCertification(user.id, dto);
  }

  @Delete('certifications/:id')
  @Roles('MANUFACTURER')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCertification(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.kyc.removeCertification(user.id, id);
  }

  @Get('files/:fileId/url')
  @ApiOperation({ summary: 'Short-lived download link (owner company or admin only)' })
  downloadUrl(
    @CurrentUser() user: AuthenticatedUser,
    @Param('fileId', ParseUUIDPipe) fileId: string,
  ): Promise<{ url: string }> {
    return this.kyc.downloadUrl(user, fileId);
  }
}
