var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Public } from '../auth/auth.decorators.js';
let CategoriesController = class CategoriesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list() {
        const categories = await this.prisma.category.findMany({
            orderBy: [{ parentId: { sort: 'asc', nulls: 'first' } }, { sortOrder: 'asc' }],
            select: { id: true, slug: true, name: true, parentId: true },
        });
        return categories;
    }
};
__decorate([
    Public(),
    Get(),
    Header('Cache-Control', 'public, max-age=300'),
    ApiOperation({ summary: 'Product categories (parents and children)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "list", null);
CategoriesController = __decorate([
    ApiTags('catalog'),
    Controller('categories'),
    __metadata("design:paramtypes", [PrismaService])
], CategoriesController);
export { CategoriesController };
//# sourceMappingURL=categories.controller.js.map