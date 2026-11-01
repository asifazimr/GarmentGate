import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  AUTH_COOKIES,
  CHAT_SOCKET_PATH,
  SocketConversationSchema,
  SocketTypingSchema,
} from '@garmentgate/shared';
import type { Server, Socket } from 'socket.io';
import { z } from 'zod';
import { TokenService } from '../auth/token.service.js';
import { type ChatActor, ChatActorService } from './chat-actor.service.js';
import { ChatRealtime, rooms } from './chat-realtime.service.js';

interface SocketData {
  actor: ChatActor;
  /** Threads this socket has open, with the company each belongs to. */
  threads: Map<string, string>;
  lastTyping: Map<string, number>;
}
type ChatSocket = Socket<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
>;

const ExpSchema = z.object({ exp: z.number() });
const TYPING_MIN_INTERVAL_MS = 1_000;

function cookie(header: string | undefined, name: string): string | null {
  for (const part of header?.split(';') ?? []) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return null;
}

/** Seconds-since-epoch expiry of an already-verified JWT. */
function expiry(token: string): number | null {
  try {
    const payload: unknown = JSON.parse(
      Buffer.from(token.split('.')[1] ?? '', 'base64url').toString('utf8'),
    );
    return ExpSchema.parse(payload).exp;
  } catch {
    return null;
  }
}

/**
 * Real-time layer for chat: same auth as HTTP (the httpOnly access cookie), rooms per user,
 * per company and for staff, and per open thread for typing indicators. Messages are sent over
 * HTTP (validated, filtered, stored) and pushed from here; the socket never accepts content.
 */
// No trailing slash: the web app proxies /api/socket.io, and Next strips trailing slashes.
@WebSocketGateway({ path: CHAT_SOCKET_PATH, addTrailingSlash: false })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly tokens: TokenService,
    private readonly actors: ChatActorService,
    private readonly realtime: ChatRealtime,
  ) {}

  afterInit(server: Server): void {
    this.realtime.attach(server);
    server.use((socket: ChatSocket, next) => {
      void this.authenticate(socket)
        .then(() => {
          next();
        })
        .catch(() => {
          next(new Error('unauthorized'));
        });
    });
  }

  private async authenticate(socket: ChatSocket): Promise<void> {
    const token = cookie(socket.handshake.headers.cookie, AUTH_COOKIES.accessToken);
    const user = token ? await this.tokens.verifyAccessToken(token) : null;
    if (!token || !user) throw new Error('unauthorized');
    socket.data = {
      actor: await this.actors.resolve(user.id),
      threads: new Map(),
      lastTyping: new Map(),
    };
    // Access tokens are short-lived: drop the socket when it expires; the client refreshes and reconnects.
    const exp = expiry(token);
    if (exp !== null) {
      const timer = setTimeout(() => socket.disconnect(true), Math.max(exp * 1000 - Date.now(), 0));
      socket.once('disconnect', () => {
        clearTimeout(timer);
      });
    }
  }

  async handleConnection(socket: ChatSocket): Promise<void> {
    const { actor } = socket.data;
    await socket.join(rooms.user(actor.userId));
    if (actor.isAdmin) await socket.join(rooms.admins);
    else if (actor.companyId) await socket.join(rooms.company(actor.companyId));
  }

  @SubscribeMessage('conversation:join')
  async join(@ConnectedSocket() socket: ChatSocket, @MessageBody() body: unknown) {
    const parsed = SocketConversationSchema.safeParse(body);
    if (!parsed.success) return { ok: false };
    try {
      const conversation = await this.actors.conversation(
        socket.data.actor,
        parsed.data.conversationId,
      );
      await socket.join(
        rooms.thread(conversation.id, socket.data.actor.isAdmin ? 'staff' : 'company'),
      );
      socket.data.threads.set(conversation.id, conversation.companyId);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @SubscribeMessage('conversation:leave')
  async leave(@ConnectedSocket() socket: ChatSocket, @MessageBody() body: unknown) {
    const parsed = SocketConversationSchema.safeParse(body);
    if (!parsed.success) return { ok: false };
    const id = parsed.data.conversationId;
    socket.data.threads.delete(id);
    await socket.leave(rooms.thread(id, 'company'));
    await socket.leave(rooms.thread(id, 'staff'));
    return { ok: true };
  }

  /** "GarmentGate is typing…" for companies; the person and company code for staff. */
  @SubscribeMessage('typing')
  typing(@ConnectedSocket() socket: ChatSocket, @MessageBody() body: unknown) {
    const parsed = SocketTypingSchema.safeParse(body);
    if (!parsed.success) return { ok: false };
    const { conversationId, typing } = parsed.data;
    if (!socket.data.threads.has(conversationId)) return { ok: false };
    const now = Date.now();
    if (typing && now - (socket.data.lastTyping.get(conversationId) ?? 0) < TYPING_MIN_INTERVAL_MS)
      return { ok: true };
    socket.data.lastTyping.set(conversationId, typing ? now : 0);

    const { actor } = socket.data;
    const base = { conversationId, userId: actor.userId, typing };
    this.realtime.typing(conversationId, {
      company: { ...base, label: actor.isAdmin ? 'GarmentGate' : actor.firstName },
      staff: {
        ...base,
        label: actor.isAdmin
          ? `${actor.firstName} ${actor.lastName}`
          : `${actor.firstName} · ${actor.companyCode ?? ''}`,
      },
    });
    return { ok: true };
  }

  handleDisconnect(socket: ChatSocket): void {
    this.logger.debug(`Socket ${socket.id} disconnected`);
  }
}
