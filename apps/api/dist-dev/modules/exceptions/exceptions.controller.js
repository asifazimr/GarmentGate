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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderExceptionSchema, ReplaceFactorySchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { CodeSchema } from '../orders/order-params.js';
import { ExceptionsService } from './exceptions.service.js';
let ExceptionsController = class ExceptionsController {
    exceptions;
    constructor(exceptions) {
        this.exceptions = exceptions;
    }
    list() {
        return this.exceptions.list();
    }
    replace(user, code, dto) {
        return this.exceptions.replaceFactory(user.id, code, dto);
    }
};
__decorate([
    Get('exceptions'),
    ApiOkResponse({ standardSchema: z.array(OrderExceptionSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExceptionsController.prototype, "list", null);
__decorate([
    Post('orders/:code/replace-factory'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Move an order to another verified factory (exception flow)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(ReplaceFactorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ExceptionsController.prototype, "replace", null);
ExceptionsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [ExceptionsService])
], ExceptionsController);
export { ExceptionsController };
//# sourceMappingURL=exceptions.controller.js.map