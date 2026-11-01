import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { Role } from '@garmentgate/shared';
import type { Conversation } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

/** Who is chatting: GarmentGate staff, or a member of one buyer / factory company. */
export interface ChatActor {
  userId: string;
  role: Role;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  companyId: string | null;
  companyType: 'BUYER' | 'MANUFACTURER' | null;
  /** BYR- / MFR- code of the actor's company. */
  companyCode: string | null;
  manufacturerProfileId: string | null;
}

@Injectable()
export class ChatActorService {
  constructor(private readonly prisma: PrismaService) {}

  async resolve(userId: string): Promise<ChatActor> {
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
    if (user?.status !== 'ACTIVE') throw new ForbiddenException('Your account can’t use messages');
    const company = user.company;
    return {
      userId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.role === 'ADMIN',
      companyId: company?.id ?? null,
      companyType: company?.type ?? null,
      companyCode:
        company?.buyerProfile?.publicCode ?? company?.manufacturerProfile?.publicCode ?? null,
      manufacturerProfileId: company?.manufacturerProfile?.id ?? null,
    };
  }

  /** Staff see every thread; a company member only their own company's threads. */
  async conversation(actor: ChatActor, id: string): Promise<Conversation> {
    const conversation = await this.prisma.conversation.findUnique({ where: { id } });
    if (!conversation || (!actor.isAdmin && conversation.companyId !== actor.companyId)) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }
}
