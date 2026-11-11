import type { ChatMessage } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import type { ChatActor } from './chat-actor.service.js';
export declare const messageInclude: {
    sender: {
        select: {
            id: true;
            role: true;
            firstName: true;
            lastName: true;
        };
    };
    attachments: {
        include: {
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
        orderBy: {
            id: "asc";
        };
    };
};
export type MessageRow = Prisma.MessageGetPayload<{
    include: typeof messageInclude;
}>;
export type Audience = {
    kind: 'company';
    viewerId: string | null;
} | {
    kind: 'staff';
    viewerId: string | null;
    companyCode: string;
};
export type AttachmentLinks = ReadonlyMap<string, {
    url: string | null;
    thumbUrl: string | null;
}>;
export declare function messageView(m: MessageRow, audience: Audience, links: AttachmentLinks, relayedFrom: ReadonlyMap<string, string>): ChatMessage;
export declare function audienceFor(actor: ChatActor, companyCode: string): Audience;
