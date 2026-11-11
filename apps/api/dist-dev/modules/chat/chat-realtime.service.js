var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { ChatEvents, } from '@garmentgate/shared';
export const rooms = {
    user: (userId) => `user:${userId}`,
    company: (companyId) => `company:${companyId}`,
    admins: 'admins',
    thread: (conversationId, side) => `conv:${conversationId}:${side}`,
};
let ChatRealtime = class ChatRealtime {
    server = null;
    attach(server) {
        this.server = server;
    }
    message(event, conversation, views) {
        const name = ChatEvents[event];
        const payload = (message) => ({
            conversationId: conversation.id,
            message,
        });
        this.server?.to(rooms.company(conversation.companyId)).emit(name, payload(views.company));
        this.server?.to(rooms.admins).emit(name, payload(views.staff));
        this.unread(conversation.companyId);
    }
    typing(conversationId, events) {
        this.server
            ?.to(rooms.thread(conversationId, 'company'))
            .emit(ChatEvents.typing, events.company);
        this.server?.to(rooms.thread(conversationId, 'staff')).emit(ChatEvents.typing, events.staff);
    }
    read(conversation, event, readerId) {
        this.server?.to(rooms.company(conversation.companyId)).emit(ChatEvents.read, event);
        this.server?.to(rooms.admins).emit(ChatEvents.read, event);
        this.server?.to(rooms.user(readerId)).emit(ChatEvents.unread);
    }
    unread(companyId) {
        this.server?.to(rooms.company(companyId)).emit(ChatEvents.unread);
        this.server?.to(rooms.admins).emit(ChatEvents.unread);
    }
    warning(userId) {
        this.server?.to(rooms.user(userId)).emit(ChatEvents.warning);
    }
};
ChatRealtime = __decorate([
    Injectable()
], ChatRealtime);
export { ChatRealtime };
//# sourceMappingURL=chat-realtime.service.js.map