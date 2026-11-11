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
import { AdminContractSchema, BuyerContractSchema, CallOffSchema, CreateContractSchema, ManufacturerContractSchema, MerchandiserSchema, AdminMerchandiserSchema, SetMerchandiserSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { ContractsService } from './contracts.service.js';
const ContractCode = new ZodValidationPipe(z.string().regex(/^CTR-\d{4}-\d{5,}$/));
const BuyerCode = new ZodValidationPipe(z.string().regex(/^BYR-[A-Z]{2}-\d{4}$/));
let ContractsController = class ContractsController {
    contracts;
    actors;
    constructor(contracts, actors) {
        this.contracts = contracts;
        this.actors = actors;
    }
    async buyerList(user) {
        return this.contracts.buyerList(await this.actors.resolve(user.id));
    }
    async callOff(user, code, dto) {
        return this.contracts.callOff(await this.actors.resolve(user.id), code, dto);
    }
    async merchandiser(user) {
        return this.contracts.buyerMerchandiser(await this.actors.resolve(user.id));
    }
    async factoryList(user) {
        return this.contracts.factoryList(await this.actors.resolve(user.id));
    }
};
__decorate([
    Get('contracts'),
    Roles('BUYER'),
    ApiOkResponse({ standardSchema: z.array(BuyerContractSchema) }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "buyerList", null);
__decorate([
    Post('contracts/:code/call-offs'),
    Roles('BUYER'),
    ApiOperation({ summary: 'Call off an order against a supply contract (deposit due)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', ContractCode)),
    __param(2, Body(new ZodValidationPipe(CallOffSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "callOff", null);
__decorate([
    Get('buyer/merchandiser'),
    Roles('BUYER'),
    ApiOkResponse({ standardSchema: MerchandiserSchema.nullable() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "merchandiser", null);
__decorate([
    Get('manufacturer/contracts'),
    Roles('MANUFACTURER'),
    ApiOkResponse({ standardSchema: z.array(ManufacturerContractSchema) }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "factoryList", null);
ContractsController = __decorate([
    ApiTags('contracts'),
    ApiCookieAuth(),
    Controller(),
    __metadata("design:paramtypes", [ContractsService,
        ChatActorService])
], ContractsController);
export { ContractsController };
let AdminContractsController = class AdminContractsController {
    contracts;
    constructor(contracts) {
        this.contracts = contracts;
    }
    list() {
        return this.contracts.adminList();
    }
    create(user, dto) {
        return this.contracts.create(user.id, dto);
    }
    end(user, code) {
        return this.contracts.end(user.id, code, 'ENDED');
    }
    merchandiser(code) {
        return this.contracts.accountMerchandiser(code);
    }
    setMerchandiser(user, code, dto) {
        return this.contracts.setMerchandiser(user.id, code, dto.userId);
    }
};
__decorate([
    Get('contracts'),
    ApiOkResponse({ standardSchema: z.array(AdminContractSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminContractsController.prototype, "list", null);
__decorate([
    Post('contracts'),
    ApiOperation({ summary: 'Agree a supply contract (frame agreement) with a buyer and a factory' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CreateContractSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminContractsController.prototype, "create", null);
__decorate([
    Post('contracts/:code/end'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', ContractCode)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminContractsController.prototype, "end", null);
__decorate([
    Get('buyers/:code/merchandiser'),
    ApiOkResponse({ standardSchema: AdminMerchandiserSchema.nullable() }),
    __param(0, Param('code', BuyerCode)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminContractsController.prototype, "merchandiser", null);
__decorate([
    Put('buyers/:code/merchandiser'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Assign (or clear) the GarmentGate merchandiser for a buyer account' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', BuyerCode)),
    __param(2, Body(new ZodValidationPipe(SetMerchandiserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminContractsController.prototype, "setMerchandiser", null);
AdminContractsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [ContractsService])
], AdminContractsController);
export { AdminContractsController };
//# sourceMappingURL=contracts.controller.js.map