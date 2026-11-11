var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let PublicCodeService = class PublicCodeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async next(kind, country, tx = this.prisma) {
        const prefix = `${kind}-${country.toUpperCase()}`;
        const [row] = await tx.$queryRaw `
      INSERT INTO "code_sequences" ("prefix", "lastValue") VALUES (${prefix}, 1)
      ON CONFLICT ("prefix") DO UPDATE SET "lastValue" = "code_sequences"."lastValue" + 1
      RETURNING "lastValue"`;
        if (!row)
            throw new Error(`Could not allocate a code for ${prefix}`);
        return `${prefix}-${String(row.lastValue).padStart(4, '0')}`;
    }
    async sequential(prefix, pad, tx = this.prisma) {
        const [row] = await tx.$queryRaw `
      INSERT INTO "code_sequences" ("prefix", "lastValue") VALUES (${prefix}, 1)
      ON CONFLICT ("prefix") DO UPDATE SET "lastValue" = "code_sequences"."lastValue" + 1
      RETURNING "lastValue"`;
        if (!row)
            throw new Error(`Could not allocate a code for ${prefix}`);
        return `${prefix}-${String(row.lastValue).padStart(pad, '0')}`;
    }
};
PublicCodeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PublicCodeService);
export { PublicCodeService };
//# sourceMappingURL=public-code.service.js.map