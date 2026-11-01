import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface ManufacturerContext {
  userId: string;
  companyId: string;
  profileId: string;
}

/** Resolves the signed-in user's factory. Catalog tools are for verified manufacturers only. */
@Injectable()
export class ManufacturerContextService {
  constructor(private readonly prisma: PrismaService) {}

  async verified(userId: string): Promise<ManufacturerContext> {
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
}
