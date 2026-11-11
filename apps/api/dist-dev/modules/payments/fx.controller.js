var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FxRatesSchema } from '@garmentgate/shared';
import { Public } from '../auth/auth.decorators.js';
import { FxService } from './fx.service.js';
let FxController = class FxController {
    fx;
    constructor(fx) {
        this.fx = fx;
    }
    async rates() {
        return FxRatesSchema.parse(await this.fx.rates());
    }
};
__decorate([
    Get('rates'),
    Public(),
    ApiOperation({ summary: 'Reference exchange rates for display conversions' }),
    ApiOkResponse({ standardSchema: FxRatesSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FxController.prototype, "rates", null);
FxController = __decorate([
    ApiTags('payments'),
    Controller('fx'),
    __metadata("design:paramtypes", [FxService])
], FxController);
export { FxController };
//# sourceMappingURL=fx.controller.js.map