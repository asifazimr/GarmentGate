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
import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { KpiQuerySchema, KpiReportSchema, UnitEconomicsSettingsSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { KpisService } from './kpis.service.js';
let KpisController = class KpisController {
    kpis;
    constructor(kpis) {
        this.kpis = kpis;
    }
    report(q) {
        return this.kpis.report(q);
    }
    settings() {
        return this.kpis.settings();
    }
    setSettings(user, dto) {
        return this.kpis.setSettings(user.id, dto);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'KPIs, contribution per order and gate progress for a period' }),
    ApiOkResponse({ standardSchema: KpiReportSchema }),
    __param(0, Query(new ZodValidationPipe(KpiQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "report", null);
__decorate([
    Get('settings'),
    ApiOkResponse({ standardSchema: UnitEconomicsSettingsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "settings", null);
__decorate([
    Put('settings'),
    ApiOperation({ summary: 'Unit economics assumptions: payment fees, merchandising, reserve' }),
    ApiOkResponse({ standardSchema: UnitEconomicsSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(UnitEconomicsSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "setSettings", null);
KpisController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/kpis'),
    __metadata("design:paramtypes", [KpisService])
], KpisController);
export { KpisController };
//# sourceMappingURL=kpis.controller.js.map