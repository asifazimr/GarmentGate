var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let BuyerContextService = class BuyerContextService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async verified(userId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: {
                company: {
                    select: {
                        id: true,
                        type: true,
                        kycStatus: true,
                        buyerProfile: { select: { publicCode: true } },
                    },
                },
            },
        });
        const company = user.company;
        const code = company?.type === 'BUYER' ? company.buyerProfile?.publicCode : undefined;
        if (!company || !code)
            throw new ForbiddenException('Only buyers can do this');
        if (company.kycStatus !== 'VERIFIED')
            throw new ForbiddenException('Your company must be verified first');
        return { userId, companyId: company.id, publicCode: code };
    }
};
BuyerContextService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BuyerContextService);
export { BuyerContextService };
//# sourceMappingURL=buyer-context.service.js.map