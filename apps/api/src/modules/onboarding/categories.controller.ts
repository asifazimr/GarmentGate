import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Category } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Public } from '../auth/auth.decorators.js';

@ApiTags('catalog')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  @Header('Cache-Control', 'public, max-age=300')
  @ApiOperation({ summary: 'Product categories (parents and children)' })
  async list(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: [{ parentId: { sort: 'asc', nulls: 'first' } }, { sortOrder: 'asc' }],
      select: { id: true, slug: true, name: true, parentId: true },
    });
    return categories;
  }
}
