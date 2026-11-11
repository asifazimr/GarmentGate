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
let ManufacturerContextService = class ManufacturerContextService {
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
                        manufacturerProfile: { select: { id: true } },
                    },
                },
            },
        });
        const company = user.company;
        const profile = company?.type === 'MANUFACTURER' ? company.manufacturerProfile : null;
        if (!company || !profile) {
            throw new ForbiddenException('Only manufacturers can manage a factory profile');
        }
        if (company.kycStatus !== 'VERIFIED') {
            throw new ForbiddenException('Your company must be verified first');
        }
        return { userId, companyId: company.id, profileId: profile.id };
    }
};
ManufacturerContextService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ManufacturerContextService);
export { ManufacturerContextService };
//# sourceMappingURL=manufacturer-context.service.js.map