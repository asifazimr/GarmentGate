import { Injectable } from '@nestjs/common';
import {
  type ChatMessage,
  ChatEvents,
  type MessageEvent,
  type ReadEvent,
  type TypingEvent,
} from '@garmentgate/shared';
import type { Server } from 'socket.io';

/** Socket.io rooms. A company never shares a room with another company. */
export const rooms = {
  user: (userId: string) => `user:${userId}`,
  company: (companyId: string) => `company:${companyId}`,
  admins: 'admins',
  /** Open thread view, per side: typing indicators are worded per audience. */
  thread: (conversationId: string, side: 'company' | 'staff') => `conv:${conversationId}:${side}`,
};

/**
 * Pushes chat events. Each event is built per audience: the company side and GarmentGate
 * staff get different views of the same message (staff see originals and real names).
 */
@Injectable()
export class ChatRealtime {
  private server: Server | null = null;

  attach(server: Server): void {
    this.server = server;
  }

  message(
    event: 'message' | 'messageUpdated',
    conversation: { id: string; companyId: string },
    views: { company: ChatMessage; staff: ChatMessage },
  ): void {
    const name = ChatEvents[event];
    const payload = (message: ChatMessage): MessageEvent => ({
      conversationId: conversation.id,
      message,
    });
    this.server?.to(rooms.company(conversation.companyId)).emit(name, payload(views.company));
    this.server?.to(rooms.admins).emit(name, payload(views.staff));
    this.unread(conversation.companyId);
  }

  typing(conversationId: string, events: { company: TypingEvent; staff: TypingEvent }): void {
    this.server
      ?.to(rooms.thread(conversationId, 'company'))
      .emit(ChatEvents.typing, events.company);
    this.server?.to(rooms.thread(conversationId, 'staff')).emit(ChatEvents.typing, events.staff);
  }

  read(conversation: { id: string; companyId: string }, event: ReadEvent, readerId: string): void {
    this.server?.to(rooms.company(conversation.companyId)).emit(ChatEvents.read, event);
    this.server?.to(rooms.admins).emit(ChatEvents.read, event);
    this.server?.to(rooms.user(readerId)).emit(ChatEvents.unread);
  }

  /** Tells clients to refresh unread counts (cheap; they refetch one number). */
  unread(companyId: string): void {
    this.server?.to(rooms.company(companyId)).emit(ChatEvents.unread);
    this.server?.to(rooms.admins).emit(ChatEvents.unread);
  }

  warning(userId: string): void {
    this.server?.to(rooms.user(userId)).emit(ChatEvents.warning);
  }
}
