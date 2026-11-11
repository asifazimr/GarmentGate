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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuyerPlusSchema, BuyerPlusSettingsSchema, GrantPlusSchema, PlusCheckoutSchema, AdminPlansSchema, FactoryPlanSchema, GrantPlanSchema, PlanCheckoutSchema, PlanSettingsSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import { PlansService } from './plans.service.js';
const FactoryCode = new ZodValidationPipe(z.string().regex(/^MFR-[A-Z]{2}-\d{4}$/));
const BuyerCode = new ZodValidationPipe(z.string().regex(/^BYR-[A-Z]{2}-\d{4}$/));
let FactoryPlanController = class FactoryPlanController {
    plans;
    context;
    constructor(plans, context) {
        this.plans = plans;
        this.context = context;
    }
    async mine(user) {
        return this.plans.mine(await this.context.verified(user.id));
    }
    async checkout(user, dto) {
        return this.plans.checkout(await this.context.verified(user.id), dto);
    }
    async cancel(user) {
        await this.plans.cancel(await this.context.verified(user.id));
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: FactoryPlanSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FactoryPlanController.prototype, "mine", null);
__decorate([
    Post('checkout'),
    ApiOperation({ summary: 'Start a Stripe Checkout for a paid plan' }),
    ApiOkResponse({ standardSchema: z.object({ url: z.url() }) }),
    HttpCode(HttpStatus.OK),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PlanCheckoutSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FactoryPlanController.prototype, "checkout", null);
__decorate([
    Post('cancel'),
    ApiOperation({ summary: 'Cancel the card plan at the end of the paid period' }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FactoryPlanController.prototype, "cancel", null);
FactoryPlanController = __decorate([
    ApiTags('plans'),
    ApiCookieAuth(),
    Controller('manufacturer/plan'),
    Roles('MANUFACTURER'),
    __metadata("design:paramtypes", [PlansService,
        ManufacturerContextService])
], FactoryPlanController);
export { FactoryPlanController };
let AdminPlansController = class AdminPlansController {
    plans;
    plus;
    constructor(plans, plus) {
        this.plans = plans;
        this.plus = plus;
    }
    plusSettings() {
        return this.plus.settings();
    }
    setPlusSettings(user, dto) {
        return this.plus.setSettings(user.id, dto);
    }
    async grantPlus(user, code, dto) {
        await this.plus.grant(user.id, code, dto);
    }
    list() {
        return this.plans.adminList();
    }
    settings() {
        return this.plans.settings();
    }
    setSettings(user, dto) {
        return this.plans.setSettings(user.id, dto);
    }
    async grant(user, code, dto) {
        await this.plans.grant(user.id, code, dto);
    }
};
__decorate([
    Get('plus/settings'),
    ApiOkResponse({ standardSchema: BuyerPlusSettingsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "plusSettings", null);
__decorate([
    Put('plus/settings'),
    ApiOkResponse({ standardSchema: BuyerPlusSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(BuyerPlusSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "setPlusSettings", null);
__decorate([
    Put('buyers/:code/plus'),
    ApiOperation({ summary: 'Give a buyer GarmentGate Plus by hand, or end a staff-set membership' }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', BuyerCode)),
    __param(2, Body(new ZodValidationPipe(GrantPlusSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "grantPlus", null);
__decorate([
    Get('plans'),
    ApiOkResponse({ standardSchema: AdminPlansSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "list", null);
__decorate([
    Get('plans/settings'),
    ApiOkResponse({ standardSchema: PlanSettingsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "settings", null);
__decorate([
    Put('plans/settings'),
    ApiOkResponse({ standardSchema: PlanSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PlanSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "setSettings", null);
__decorate([
    Put('manufacturers/:code/plan'),
    ApiOperation({
        summary: 'Put a factory on a plan by hand (bank transfer, promotion) or on Free',
    }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', FactoryCode)),
    __param(2, Body(new ZodValidationPipe(GrantPlanSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminPlansController.prototype, "grant", null);
AdminPlansController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Controller('admin'),
    Roles('ADMIN'),
    __metadata("design:paramtypes", [PlansService,
        BuyerPlusService])
], AdminPlansController);
export { AdminPlansController };
let BuyerPlusController = class BuyerPlusController {
    plus;
    context;
    constructor(plus, context) {
        this.plus = plus;
        this.context = context;
    }
    async mine(user) {
        return this.plus.mine(await this.context.verified(user.id));
    }
    async checkout(user, dto) {
        return this.plus.checkout(await this.context.verified(user.id), dto);
    }
    async cancel(user) {
        await this.plus.cancel(await this.context.verified(user.id));
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: BuyerPlusSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerPlusController.prototype, "mine", null);
__decorate([
    Post('checkout'),
    ApiOperation({ summary: 'Start a Stripe Checkout for GarmentGate Plus' }),
    ApiOkResponse({ standardSchema: z.object({ url: z.url() }) }),
    HttpCode(HttpStatus.OK),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PlusCheckoutSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerPlusController.prototype, "checkout", null);
__decorate([
    Post('cancel'),
    ApiOperation({ summary: 'Cancel GarmentGate Plus at the end of the paid period' }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerPlusController.prototype, "cancel", null);
BuyerPlusController = __decorate([
    ApiTags('plans'),
    ApiCookieAuth(),
    Controller('buyer/plus'),
    Roles('BUYER'),
    __metadata("design:paramtypes", [BuyerPlusService,
        BuyerContextService])
], BuyerPlusController);
export { BuyerPlusController };
//# sourceMappingURL=plans.controller.js.map