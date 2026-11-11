var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, } from '@nestjs/websockets';
import { AUTH_COOKIES, CHAT_SOCKET_PATH, SocketConversationSchema, SocketTypingSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { TokenService } from '../auth/token.service.js';
import { RealtimeService } from '../notifications/realtime.service.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatRealtime, rooms } from './chat-realtime.service.js';
const ExpSchema = z.object({ exp: z.number() });
const TYPING_MIN_INTERVAL_MS = 1_000;
function cookie(header, name) {
    for (const part of header?.split(';') ?? []) {
        const [key, ...value] = part.trim().split('=');
        if (key === name)
            return decodeURIComponent(value.join('='));
    }
    return null;
}
function expiry(token) {
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64url').toString('utf8'));
        return ExpSchema.parse(payload).exp;
    }
    catch {
        return null;
    }
}
let ChatGateway = ChatGateway_1 = class ChatGateway {
    tokens;
    actors;
    realtime;
    push;
    logger = new Logger(ChatGateway_1.name);
    constructor(tokens, actors, realtime, push) {
        this.tokens = tokens;
        this.actors = actors;
        this.realtime = realtime;
        this.push = push;
    }
    afterInit(server) {
        this.realtime.attach(server);
        this.push.attach(server);
        server.use((socket, next) => {
            void this.authenticate(socket)
                .then(() => {
                next();
            })
                .catch(() => {
                next(new Error('unauthorized'));
            });
        });
    }
    async authenticate(socket) {
        const token = cookie(socket.handshake.headers.cookie, AUTH_COOKIES.accessToken);
        const user = token ? await this.tokens.verifyAccessToken(token) : null;
        if (!token || !user)
            throw new Error('unauthorized');
        socket.data = {
            actor: await this.actors.resolve(user.id),
            threads: new Map(),
            lastTyping: new Map(),
        };
        const exp = expiry(token);
        if (exp !== null) {
            const timer = setTimeout(() => socket.disconnect(true), Math.max(exp * 1000 - Date.now(), 0));
            socket.once('disconnect', () => {
                clearTimeout(timer);
            });
        }
    }
    async handleConnection(socket) {
        const { actor } = socket.data;
        await socket.join(rooms.user(actor.userId));
        if (actor.isAdmin)
            await socket.join(rooms.admins);
        else if (actor.companyId)
            await socket.join(rooms.company(actor.companyId));
    }
    async join(socket, body) {
        const parsed = SocketConversationSchema.safeParse(body);
        if (!parsed.success)
            return { ok: false };
        try {
            const conversation = await this.actors.conversation(socket.data.actor, parsed.data.conversationId);
            await socket.join(rooms.thread(conversation.id, socket.data.actor.isAdmin ? 'staff' : 'company'));
            socket.data.threads.set(conversation.id, conversation.companyId);
            return { ok: true };
        }
        catch {
            return { ok: false };
        }
    }
    async leave(socket, body) {
        const parsed = SocketConversationSchema.safeParse(body);
        if (!parsed.success)
            return { ok: false };
        const id = parsed.data.conversationId;
        socket.data.threads.delete(id);
        await socket.leave(rooms.thread(id, 'company'));
        await socket.leave(rooms.thread(id, 'staff'));
        return { ok: true };
    }
    typing(socket, body) {
        const parsed = SocketTypingSchema.safeParse(body);
        if (!parsed.success)
            return { ok: false };
        const { conversationId, typing } = parsed.data;
        if (!socket.data.threads.has(conversationId))
            return { ok: false };
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
    handleDisconnect(socket) {
        this.logger.debug(`Socket ${socket.id} disconnected`);
    }
};
__decorate([
    SubscribeMessage('conversation:join'),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "join", null);
__decorate([
    SubscribeMessage('conversation:leave'),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "leave", null);
__decorate([
    SubscribeMessage('typing'),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "typing", null);
ChatGateway = ChatGateway_1 = __decorate([
    WebSocketGateway({ path: CHAT_SOCKET_PATH, addTrailingSlash: false }),
    __metadata("design:paramtypes", [TokenService,
        ChatActorService,
        ChatRealtime,
        RealtimeService])
], ChatGateway);
export { ChatGateway };
//# sourceMappingURL=chat.gateway.js.map