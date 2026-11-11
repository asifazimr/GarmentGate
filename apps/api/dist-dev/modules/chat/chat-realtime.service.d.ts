import { type ChatMessage, type ReadEvent, type TypingEvent } from '@garmentgate/shared';
import type { Server } from 'socket.io';
export declare const rooms: {
    user: (userId: string) => string;
    company: (companyId: string) => string;
    admins: string;
    thread: (conversationId: string, side: "company" | "staff") => string;
};
export declare class ChatRealtime {
    private server;
    attach(server: Server): void;
    message(event: 'message' | 'messageUpdated', conversation: {
        id: string;
        companyId: string;
    }, views: {
        company: ChatMessage;
        staff: ChatMessage;
    }): void;
    typing(conversationId: string, events: {
        company: TypingEvent;
        staff: TypingEvent;
    }): void;
    read(conversation: {
        id: string;
        companyId: string;
    }, event: ReadEvent, readerId: string): void;
    unread(companyId: string): void;
    warning(userId: string): void;
}
