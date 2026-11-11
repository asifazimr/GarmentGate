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
import { BadRequestException, Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req, } from '@nestjs/common';
import { ApiCookieAuth, ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { BuyerPaymentsSchema, ConfirmPaymentSchema, FinanceInboxSchema, FxRatesSchema, LedgerBalancesSchema, ManufacturerPayoutsSchema, MarkSentSchema, OrderFinanceSchema, PaymentStartSchema, PayoutSchema, PresignProofSchema, RefundSchema, RejectPaymentSchema, ReleaseScheduleSchema, StartPaymentSchema, AdminBankAccountSchema, FactoryBankAccountInputSchema, FactoryBankAccountViewSchema, ReviewBankAccountSchema, PayFeesSchema, ServiceFeesSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Public, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { FxService } from './fx.service.js';
import { BankAccountsService } from './bank-accounts.service.js';
import { StripeEvents } from './stripe-events.js';
import { PaymentsService } from './payments.service.js';
import { StripeProvider } from './providers/stripe.provider.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
const CodeSchema = z.string().regex(/^ORD-\d{4}-\d{4,}$/, { error: 'Unknown order' });
let PaymentsController = class PaymentsController {
    actors;
    payments;
    stripe;
    bankAccounts;
    stripeEvents;
    constructor(actors, payments, stripe, bankAccounts, stripeEvents) {
        this.actors = actors;
        this.payments = payments;
        this.stripe = stripe;
        this.bankAccounts = bankAccounts;
        this.stripeEvents = stripeEvents;
    }
    async buyerPayments(user, code) {
        return this.payments.buyerView(await this.actors.resolve(user.id), code);
    }
    async payFees(user, code, dto) {
        return this.payments.payFees(await this.actors.resolve(user.id), code, dto);
    }
    async start(user, code, dto) {
        return this.payments.start(await this.actors.resolve(user.id), code, dto);
    }
    async markSent(user, code, id, dto) {
        await this.payments.markSent(await this.actors.resolve(user.id), code, id, dto);
    }
    async orderPayouts(user, code) {
        return this.payments.manufacturerView(await this.actors.resolve(user.id), code);
    }
    async payouts(user) {
        return this.payments.manufacturerOverview(await this.actors.resolve(user.id));
    }
    async bankAccount(user) {
        return this.bankAccounts.mine(await this.actors.resolve(user.id));
    }
    async setBankAccount(user, dto) {
        await this.bankAccounts.submit(await this.actors.resolve(user.id), dto);
    }
    async stripeWebhook(req, signature) {
        if (!req.rawBody || !signature)
            throw new BadRequestException('Missing signature');
        let event;
        try {
            event = this.stripe.event(req.rawBody, signature);
        }
        catch {
            throw new BadRequestException('Invalid signature');
        }
        await this.payments.stripeEvent(event);
        await this.stripeEvents.emit(event);
        return { received: true };
    }
};
__decorate([
    Get('orders/:code/payments'),
    Roles('BUYER'),
    ApiOkResponse({ standardSchema: BuyerPaymentsSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "buyerPayments", null);
__decorate([
    Post('orders/:code/fees/payments'),
    Roles('BUYER'),
    ApiOperation({ summary: 'Pay the sample or inspection fees due on an order' }),
    ApiOkResponse({ standardSchema: PaymentStartSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(PayFeesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "payFees", null);
__decorate([
    Post('orders/:code/payments'),
    Roles('BUYER'),
    ApiOperation({ summary: 'Pay the deposit or balance: bank transfer, letter of credit or card' }),
    ApiOkResponse({ standardSchema: PaymentStartSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(StartPaymentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "start", null);
__decorate([
    Post('orders/:code/payments/:id/sent'),
    Roles('BUYER'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Param('id', ParseUUIDPipe)),
    __param(3, Body(new ZodValidationPipe(MarkSentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "markSent", null);
__decorate([
    Get('orders/:code/payouts'),
    Roles('MANUFACTURER'),
    ApiOkResponse({ standardSchema: ManufacturerPayoutsSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "orderPayouts", null);
__decorate([
    Get('manufacturer/payouts'),
    Roles('MANUFACTURER'),
    ApiOkResponse({ standardSchema: ManufacturerPayoutsSchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "payouts", null);
__decorate([
    Get('manufacturer/bank-account'),
    Roles('MANUFACTURER'),
    ApiOkResponse({ standardSchema: FactoryBankAccountViewSchema.nullable() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "bankAccount", null);
__decorate([
    Put('manufacturer/bank-account'),
    Roles('MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Where GarmentGate pays the factory; staff verify before payouts' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(FactoryBankAccountInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "setBankAccount", null);
__decorate([
    Post('payments/stripe/webhook'),
    Public(),
    SkipThrottle(),
    HttpCode(HttpStatus.OK),
    ApiExcludeEndpoint(),
    __param(0, Req()),
    __param(1, Headers('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "stripeWebhook", null);
PaymentsController = __decorate([
    ApiTags('payments'),
    ApiCookieAuth(),
    Controller(),
    __metadata("design:paramtypes", [ChatActorService,
        PaymentsService,
        StripeProvider,
        BankAccountsService,
        StripeEvents])
], PaymentsController);
export { PaymentsController };
let AdminFinanceController = class AdminFinanceController {
    payments;
    fx;
    bankAccounts;
    constructor(payments, fx, bankAccounts) {
        this.payments = payments;
        this.fx = fx;
        this.bankAccounts = bankAccounts;
    }
    bankAccountsList() {
        return this.bankAccounts.list();
    }
    reviewBankAccount(user, id, dto) {
        return this.bankAccounts.review(user.id, id, dto);
    }
    inbox() {
        return this.payments.inbox();
    }
    balances() {
        return this.payments.balances();
    }
    order(code) {
        return this.payments.orderFinance(code);
    }
    presignProof(user, id, dto) {
        return this.payments.presignProof(user.id, id, dto);
    }
    confirm(user, id, dto) {
        return this.payments.confirm(user.id, id, dto);
    }
    reject(user, id, dto) {
        return this.payments.reject(user.id, id, dto.reason);
    }
    approve(user, id) {
        return this.payments.approveRelease(user.id, id);
    }
    payout(user, id, dto) {
        return this.payments.payout(user.id, id, dto);
    }
    refund(user, code, dto) {
        return this.payments.refund(user.id, code, dto);
    }
    schedule() {
        return this.payments.releaseSchedule();
    }
    setSchedule(user, dto) {
        return this.payments.setReleaseSchedule(user.id, dto);
    }
    fees() {
        return this.payments.serviceFees();
    }
    setFees(user, dto) {
        return this.payments.setServiceFees(user.id, dto);
    }
    rates() {
        return this.fx.rates().then((r) => FxRatesSchema.parse(r));
    }
    setRates(user, dto) {
        return this.fx.update(user.id, dto);
    }
};
__decorate([
    Get('bank-accounts'),
    ApiOkResponse({ standardSchema: AdminBankAccountSchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "bankAccountsList", null);
__decorate([
    Post('bank-accounts/:id/review'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Verify (or reject) a factory’s payout bank details' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(z.uuid()))),
    __param(2, Body(new ZodValidationPipe(ReviewBankAccountSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "reviewBankAccount", null);
__decorate([
    Get('inbox'),
    ApiOkResponse({ standardSchema: FinanceInboxSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "inbox", null);
__decorate([
    Get('balances'),
    ApiOkResponse({ standardSchema: LedgerBalancesSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "balances", null);
__decorate([
    Get('orders/:code'),
    ApiOkResponse({ standardSchema: OrderFinanceSchema }),
    __param(0, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "order", null);
__decorate([
    Post('payments/:id/uploads'),
    UploadThrottle(),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(PresignProofSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "presignProof", null);
__decorate([
    Post('payments/:id/confirm'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ConfirmPaymentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "confirm", null);
__decorate([
    Post('payments/:id/reject'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(RejectPaymentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "reject", null);
__decorate([
    Post('releases/:id/approve'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "approve", null);
__decorate([
    Post('releases/:id/payout'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(PayoutSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "payout", null);
__decorate([
    Post('orders/:code/refunds'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(RefundSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "refund", null);
__decorate([
    Get('schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "schedule", null);
__decorate([
    Put('schedule'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ReleaseScheduleSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "setSchedule", null);
__decorate([
    Get('fees'),
    ApiOkResponse({ standardSchema: ServiceFeesSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "fees", null);
__decorate([
    Put('fees'),
    ApiOperation({ summary: 'Sample and inspection fees, the first-inspection offer, claim window' }),
    ApiOkResponse({ standardSchema: ServiceFeesSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ServiceFeesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "setFees", null);
__decorate([
    Get('rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "rates", null);
__decorate([
    Put('rates'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(FxRatesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminFinanceController.prototype, "setRates", null);
AdminFinanceController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/finance'),
    __metadata("design:paramtypes", [PaymentsService,
        FxService,
        BankAccountsService])
], AdminFinanceController);
export { AdminFinanceController };
//# sourceMappingURL=payments.controller.js.map