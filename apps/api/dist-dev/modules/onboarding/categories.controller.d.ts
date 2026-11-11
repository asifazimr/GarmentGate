import type { Category } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
export declare class CategoriesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): Promise<Category[]>;
}
