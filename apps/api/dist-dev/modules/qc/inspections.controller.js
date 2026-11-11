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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddInspectionPhotoSchema, AssignInspectionSchema, BookInspectionSchema, CreateInspectorSchema, InspectionReportSchema, InspectorJobDetailSchema, InspectorJobSchema, InspectorSchema, PresignInspectionFileSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { InspectionsService } from './inspections.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
let OrderInspectionsController = class OrderInspectionsController {
    actors;
    inspections;
    constructor(actors, inspections) {
        this.actors = actors;
        this.inspections = inspections;
    }
    async book(user, code, dto) {
        return this.inspections.book(await this.actors.resolve(user.id), code, dto);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Book an inline or final random inspection' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(BookInspectionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderInspectionsController.prototype, "book", null);
OrderInspectionsController = __decorate([
    ApiTags('qc'),
    ApiCookieAuth(),
    Controller('orders/:code/inspections'),
    __metadata("design:paramtypes", [ChatActorService,
        InspectionsService])
], OrderInspectionsController);
export { OrderInspectionsController };
let InspectorController = class InspectorController {
    inspections;
    constructor(inspections) {
        this.inspections = inspections;
    }
    jobs(user) {
        return this.inspections.jobs(user);
    }
    detail(user, id) {
        return this.inspections.jobDetail(user, id);
    }
    presign(user, id, dto) {
        return this.inspections.presign(user, id, dto);
    }
    addPhoto(user, id, dto) {
        return this.inspections.addPhoto(user, id, dto);
    }
    report(user, id, dto) {
        return this.inspections.report(user, id, dto);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: InspectorJobSchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InspectorController.prototype, "jobs", null);
__decorate([
    Get(':id'),
    ApiOkResponse({ standardSchema: InspectorJobDetailSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InspectorController.prototype, "detail", null);
__decorate([
    Post(':id/uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned upload for a photo or the PDF report' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(PresignInspectionFileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InspectorController.prototype, "presign", null);
__decorate([
    Post(':id/photos'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(AddInspectionPhotoSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InspectorController.prototype, "addPhoto", null);
__decorate([
    Post(':id/report'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'File the AQL report (once). A final pass moves the order on.' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(InspectionReportSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InspectorController.prototype, "report", null);
InspectorController = __decorate([
    ApiTags('qc'),
    ApiCookieAuth(),
    Roles('INSPECTOR', 'ADMIN'),
    Controller('inspector/inspections'),
    __metadata("design:paramtypes", [InspectionsService])
], InspectorController);
export { InspectorController };
let AdminInspectionsController = class AdminInspectionsController {
    inspections;
    constructor(inspections) {
        this.inspections = inspections;
    }
    inspectors() {
        return this.inspections.inspectors();
    }
    createInspector(admin, dto) {
        return this.inspections.createInspector(admin.id, dto);
    }
    assign(admin, id, dto) {
        return this.inspections.assign(admin.id, id, dto);
    }
};
__decorate([
    Get('inspectors'),
    ApiOkResponse({ standardSchema: InspectorSchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminInspectionsController.prototype, "inspectors", null);
__decorate([
    Post('inspectors'),
    ApiOperation({ summary: 'Create an inspector account (they set a password from the email)' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CreateInspectorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminInspectionsController.prototype, "createInspector", null);
__decorate([
    Patch('inspections/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Assign an inspector and/or change the date' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(AssignInspectionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminInspectionsController.prototype, "assign", null);
AdminInspectionsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [InspectionsService])
], AdminInspectionsController);
export { AdminInspectionsController };
//# sourceMappingURL=inspections.controller.js.map