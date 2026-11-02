import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AddInspectionPhotoDto,
  AddInspectionPhotoSchema,
  type AssignInspectionDto,
  AssignInspectionSchema,
  type BookInspectionDto,
  BookInspectionSchema,
  type CreateInspectorDto,
  CreateInspectorSchema,
  type InspectionReportDto,
  InspectionReportSchema,
  type Inspector,
  type InspectorJob,
  type InspectorJobDetail,
  InspectorJobDetailSchema,
  InspectorJobSchema,
  InspectorSchema,
  type PresignInspectionFileDto,
  PresignInspectionFileSchema,
  type PresignUploadResponse,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { InspectionsService } from './inspections.service.js';

/** Booking an inspection on an order: the buyer, or staff. */
@ApiTags('qc')
@ApiCookieAuth()
@Controller('orders/:code/inspections')
export class OrderInspectionsController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly inspections: InspectionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Book an inline or final random inspection' })
  async book(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookInspectionSchema)) dto: BookInspectionDto,
  ): Promise<{ id: string }> {
    return this.inspections.book(await this.actors.resolve(user.id), code, dto);
  }
}

/** GarmentGate's inspectors (staff can do the same): their jobs, photos and AQL reports. */
@ApiTags('qc')
@ApiCookieAuth()
@Roles('INSPECTOR', 'ADMIN')
@Controller('inspector/inspections')
export class InspectorController {
  constructor(private readonly inspections: InspectionsService) {}

  @Get()
  @ApiOkResponse({ standardSchema: InspectorJobSchema.array() })
  jobs(@CurrentUser() user: AuthenticatedUser): Promise<InspectorJob[]> {
    return this.inspections.jobs(user);
  }

  @Get(':id')
  @ApiOkResponse({ standardSchema: InspectorJobDetailSchema })
  detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<InspectorJobDetail> {
    return this.inspections.jobDetail(user, id);
  }

  @Post(':id/uploads')
  @ApiOperation({ summary: 'Presigned upload for a photo or the PDF report' })
  presign(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(PresignInspectionFileSchema)) dto: PresignInspectionFileDto,
  ): Promise<PresignUploadResponse> {
    return this.inspections.presign(user, id, dto);
  }

  @Post(':id/photos')
  @HttpCode(HttpStatus.NO_CONTENT)
  addPhoto(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(AddInspectionPhotoSchema)) dto: AddInspectionPhotoDto,
  ): Promise<void> {
    return this.inspections.addPhoto(user, id, dto);
  }

  @Post(':id/report')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'File the AQL report (once). A final pass moves the order on.' })
  report(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(InspectionReportSchema)) dto: InspectionReportDto,
  ): Promise<void> {
    return this.inspections.report(user, id, dto);
  }
}

@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class AdminInspectionsController {
  constructor(private readonly inspections: InspectionsService) {}

  @Get('inspectors')
  @ApiOkResponse({ standardSchema: InspectorSchema.array() })
  inspectors(): Promise<Inspector[]> {
    return this.inspections.inspectors();
  }

  @Post('inspectors')
  @ApiOperation({ summary: 'Create an inspector account (they set a password from the email)' })
  createInspector(
    @CurrentUser() admin: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateInspectorSchema)) dto: CreateInspectorDto,
  ): Promise<{ id: string }> {
    return this.inspections.createInspector(admin.id, dto);
  }

  @Patch('inspections/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Assign an inspector and/or change the date' })
  assign(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(AssignInspectionSchema)) dto: AssignInspectionDto,
  ): Promise<void> {
    return this.inspections.assign(admin.id, id, dto);
  }
}
