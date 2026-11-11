import type { SavedIndex, Shortlist, ShortlistItemInput } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import type { BuyerContext } from './buyer-context.service.js';
export declare class ShortlistsService {
    private readonly prisma;
    private readonly media;
    constructor(prisma: PrismaService, media: MediaService);
    private ensureDefault;
    list(ctx: BuyerContext): Promise<Shortlist[]>;
    savedIndex(ctx: BuyerContext): Promise<SavedIndex>;
    create(ctx: BuyerContext, name: string): Promise<{
        id: string;
    }>;
    rename(ctx: BuyerContext, id: string, name: string): Promise<void>;
    remove(ctx: BuyerContext, id: string): Promise<void>;
    addItem(ctx: BuyerContext, listId: string, input: ShortlistItemInput): Promise<void>;
    removeItem(ctx: BuyerContext, listId: string, input: ShortlistItemInput): Promise<void>;
    private own;
}
