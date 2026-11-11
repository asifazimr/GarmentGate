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
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuyerSourcingNeedsSchema, CompanyInfoSchema, ManufacturerCapabilitiesSchema, OnboardingStateSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { AuthService } from '../auth/auth.service.js';
import { TokenService } from '../auth/token.service.js';
import { OnboardingService } from './onboarding.service.js';
let OnboardingController = class OnboardingController {
    onboarding;
    auth;
    tokens;
    constructor(onboarding, auth, tokens) {
        this.onboarding = onboarding;
        this.auth = auth;
        this.tokens = tokens;
    }
    state(user) {
        return this.onboarding.getState(user.id);
    }
    saveCompany(user, dto) {
        return this.onboarding.saveCompany(user.id, dto);
    }
    saveProfile(user, body) {
        if (user.role === 'MANUFACTURER') {
            const dto = new ZodValidationPipe(ManufacturerCapabilitiesSchema).transform(body);
            return this.onboarding.saveManufacturerProfile(user.id, dto);
        }
        const dto = new ZodValidationPipe(BuyerSourcingNeedsSchema).transform(body);
        return this.onboarding.saveBuyerProfile(user.id, dto);
    }
    async submit(user, res) {
        const state = await this.onboarding.submit(user.id);
        this.tokens.setAccessCookie(res, await this.auth.reissueAccessToken(user.id));
        return state;
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Current onboarding progress, so the wizard can resume' }),
    ApiOkResponse({ standardSchema: OnboardingStateSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "state", null);
__decorate([
    Put('company'),
    ApiOperation({ summary: 'Step 1: save company details' }),
    ApiOkResponse({ standardSchema: OnboardingStateSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CompanyInfoSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "saveCompany", null);
__decorate([
    Put('profile'),
    ApiOperation({ summary: 'Step 2: capabilities (manufacturers) or sourcing needs (buyers)' }),
    ApiOkResponse({ standardSchema: OnboardingStateSchema }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "saveProfile", null);
__decorate([
    Post('submit'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Step 3: submit documents for verification' }),
    ApiOkResponse({ standardSchema: OnboardingStateSchema }),
    __param(0, CurrentUser()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "submit", null);
OnboardingController = __decorate([
    ApiTags('onboarding'),
    ApiCookieAuth(),
    Roles('BUYER', 'MANUFACTURER'),
    Controller('onboarding'),
    __metadata("design:paramtypes", [OnboardingService,
        AuthService,
        TokenService])
], OnboardingController);
export { OnboardingController };
//# sourceMappingURL=onboarding.controller.js.map