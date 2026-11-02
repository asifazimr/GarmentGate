import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';

/**
 * The Socket.io server, for modules that push to a user without depending on chat.
 * The chat gateway attaches it on init; until then (and in workers) pushes are no-ops.
 */
@Injectable()
export class RealtimeService {
  private server: Server | null = null;

  attach(server: Server): void {
    this.server = server;
  }

  toUser(userId: string, event: string, payload: unknown): void {
    this.server?.to(`user:${userId}`).emit(event, payload);
  }
}
