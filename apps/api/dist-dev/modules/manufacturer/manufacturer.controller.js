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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCertificationSchema, CapacityCalendarSchema, FactoryPhotoInputSchema, IMAGE_MAX_BYTES, ManufacturerCapabilitiesSchema, ManufacturerProductSchema, MonthSchema, PresignMediaSchema, ProductInputSchema, PublicManufacturerSchema, ReorderSchema, UpdateCapacityMonthSchema, UPLOAD_MAX_BYTES, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { FilesService } from '../storage/files.service.js';
import { CapacityService } from './capacity.service.js';
import { ManufacturerContextService } from './manufacturer-context.service.js';
import { ManufacturerProductsService } from './products.service.js';
import { ManufacturerProfileService } from './profile.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
const CalendarQuerySchema = z.object({
    from: MonthSchema.optional(),
    months: z.coerce.number().int().min(1).max(24).default(12),
});
let ManufacturerController = class ManufacturerController {
    context;
    profile;
    products;
    capacity;
    files;
    constructor(context, profile, products, capacity, files) {
        this.context = context;
        this.profile = profile;
        this.products = products;
        this.capacity = capacity;
        this.files = files;
    }
    async presign(user, dto) {
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
    async getProfile(user) {
        return this.profile.view(await this.context.verified(user.id));
    }
    async updateProfile(user, dto) {
        await this.profile.updateCapabilities(await this.context.verified(user.id), dto);
    }
    async preview(user) {
        return this.profile.preview(await this.context.verified(user.id));
    }
    async addPhoto(user, dto) {
        await this.profile.addPhoto(await this.context.verified(user.id), dto);
    }
    async reorderPhotos(user, dto) {
        await this.profile.reorderPhotos(await this.context.verified(user.id), dto);
    }
    async removePhoto(user, id) {
        await this.profile.removePhoto(await this.context.verified(user.id), id);
    }
    async certifications(user) {
        return this.profile.certifications(await this.context.verified(user.id));
    }
    async addCertification(user, dto) {
        await this.profile.addCertification(await this.context.verified(user.id), dto);
    }
    async removeCertification(user, id) {
        await this.profile.removeCertification(await this.context.verified(user.id), id);
    }
    async listProducts(user) {
        return this.products.list(await this.context.verified(user.id));
    }
    async createProduct(user, dto) {
        return this.products.create(await this.context.verified(user.id), dto);
    }
    async getProduct(user, id) {
        return this.products.get(await this.context.verified(user.id), id);
    }
    async updateProduct(user, id, dto) {
        return this.products.update(await this.context.verified(user.id), id, dto);
    }
    async removeProduct(user, id) {
        await this.products.remove(await this.context.verified(user.id), id);
    }
    async addProductImage(user, id, dto) {
        return this.products.addImage(await this.context.verified(user.id), id, dto);
    }
    async reorderProductImages(user, id, dto) {
        await this.products.reorderImages(await this.context.verified(user.id), id, dto);
    }
    async removeProductImage(user, id, imageId) {
        await this.products.removeImage(await this.context.verified(user.id), id, imageId);
    }
    async calendar(user, query) {
        return this.capacity.calendar(await this.context.verified(user.id), query.from, query.months);
    }
    async updateCapacity(user, month, dto) {
        await this.capacity.updateMonth(await this.context.verified(user.id), month, dto);
    }
};
__decorate([
    Post('uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned POST for product images, factory photos or certificates' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PresignMediaSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "presign", null);
__decorate([
    Get('profile'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "getProfile", null);
__decorate([
    Put('profile'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ManufacturerCapabilitiesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "updateProfile", null);
__decorate([
    Get('profile/preview'),
    ApiOperation({ summary: 'Your profile exactly as buyers see it (same serializer)' }),
    ApiOkResponse({ standardSchema: PublicManufacturerSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "preview", null);
__decorate([
    Post('photos'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(FactoryPhotoInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "addPhoto", null);
__decorate([
    Put('photos/order'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ReorderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "reorderPhotos", null);
__decorate([
    Delete('photos/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "removePhoto", null);
__decorate([
    Get('certifications'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "certifications", null);
__decorate([
    Post('certifications'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(AddCertificationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "addCertification", null);
__decorate([
    Delete('certifications/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "removeCertification", null);
__decorate([
    Get('products'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "listProducts", null);
__decorate([
    Post('products'),
    ApiOkResponse({ standardSchema: ManufacturerProductSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ProductInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "createProduct", null);
__decorate([
    Get('products/:id'),
    ApiOkResponse({ standardSchema: ManufacturerProductSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "getProduct", null);
__decorate([
    Put('products/:id'),
    ApiOkResponse({ standardSchema: ManufacturerProductSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ProductInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "updateProduct", null);
__decorate([
    Delete('products/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "removeProduct", null);
__decorate([
    Post('products/:id/images'),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(FactoryPhotoInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "addProductImage", null);
__decorate([
    Put('products/:id/images/order'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ReorderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "reorderProductImages", null);
__decorate([
    Delete('products/:id/images/:imageId'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Param('imageId', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "removeProductImage", null);
__decorate([
    Get('capacity'),
    ApiOkResponse({ standardSchema: CapacityCalendarSchema }),
    __param(0, CurrentUser()),
    __param(1, Query(new ZodValidationPipe(CalendarQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "calendar", null);
__decorate([
    Put('capacity/:month'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('month', new ZodValidationPipe(MonthSchema))),
    __param(2, Body(new ZodValidationPipe(UpdateCapacityMonthSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "updateCapacity", null);
ManufacturerController = __decorate([
    ApiTags('manufacturer'),
    ApiCookieAuth(),
    Roles('MANUFACTURER'),
    Controller('manufacturer'),
    __metadata("design:paramtypes", [ManufacturerContextService,
        ManufacturerProfileService,
        ManufacturerProductsService,
        CapacityService,
        FilesService])
], ManufacturerController);
export { ManufacturerController };
//# sourceMappingURL=manufacturer.controller.js.map