import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface BuyerContext {
  userId: string;
  companyId: string;
  publicCode: string;
}

/** Resolves the signed-in buyer's verified company. */
@Injectable()
export class BuyerContextService {
  constructor(private readonly prisma: PrismaService) {}

  async verified(userId: string): Promise<BuyerContext> {
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
    if (!company || !code) throw new ForbiddenException('Only buyers can do this');
    if (company.kycStatus !== 'VERIFIED')
      throw new ForbiddenException('Your company must be verified first');
    return { userId, companyId: company.id, publicCode: code };
  }
}
