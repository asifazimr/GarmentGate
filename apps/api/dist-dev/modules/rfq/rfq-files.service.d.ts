import type { RfqAttachmentView } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { MediaService } from '../media/media.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare const attachmentInclude: {
    file: {
        include: {
            renditions: {
                orderBy: {
                    width: "asc";
                };
            };
        };
    };
};
export type AttachmentRow = Prisma.RfqAttachmentGetPayload<{
    include: typeof attachmentInclude;
}>;
export declare const visibleToFactories: (a: AttachmentRow) => boolean;
export declare class RfqFilesService {
    private readonly storage;
    private readonly media;
    constructor(storage: StorageService, media: MediaService);
    views(rows: AttachmentRow[], audience: {
        kind: 'owner';
    } | {
        kind: 'factory' | 'admin';
        rfqCode: string;
    }): Promise<RfqAttachmentView[]>;
    private links;
}
