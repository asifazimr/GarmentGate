var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let ChatActorService = class ChatActorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async resolve(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                role: true,
                status: true,
                firstName: true,
                lastName: true,
                company: {
                    select: {
                        id: true,
                        type: true,
                        buyerProfile: { select: { publicCode: true } },
                        manufacturerProfile: { select: { id: true, publicCode: true } },
                    },
                },
            },
        });
        if (user?.status !== 'ACTIVE')
            throw new ForbiddenException('Your account can’t use messages');
        const company = user.company;
        return {
            userId,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.role === 'ADMIN',
            companyId: company?.id ?? null,
            companyType: company?.type ?? null,
            companyCode: company?.buyerProfile?.publicCode ?? company?.manufacturerProfile?.publicCode ?? null,
            manufacturerProfileId: company?.manufacturerProfile?.id ?? null,
        };
    }
    async conversation(actor, id) {
        const conversation = await this.prisma.conversation.findUnique({ where: { id } });
        if (!conversation || (!actor.isAdmin && conversation.companyId !== actor.companyId)) {
            throw new NotFoundException('Conversation not found');
        }
        return conversation;
    }
};
ChatActorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ChatActorService);
export { ChatActorService };
//# sourceMappingURL=chat-actor.service.js.map