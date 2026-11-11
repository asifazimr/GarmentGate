import { type OnGatewayConnection, type OnGatewayInit } from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { TokenService } from '../auth/token.service.js';
import { RealtimeService } from '../notifications/realtime.service.js';
import { type ChatActor, ChatActorService } from './chat-actor.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
interface SocketData {
    actor: ChatActor;
    threads: Map<string, string>;
    lastTyping: Map<string, number>;
}
type ChatSocket = Socket<Record<string, never>, Record<string, never>, Record<string, never>, SocketData>;
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection {
    private readonly tokens;
    private readonly actors;
    private readonly realtime;
    private readonly push;
    private readonly logger;
    constructor(tokens: TokenService, actors: ChatActorService, realtime: ChatRealtime, push: RealtimeService);
    afterInit(server: Server): void;
    private authenticate;
    handleConnection(socket: ChatSocket): Promise<void>;
    join(socket: ChatSocket, body: unknown): Promise<{
        ok: boolean;
    }>;
    leave(socket: ChatSocket, body: unknown): Promise<{
        ok: boolean;
    }>;
    typing(socket: ChatSocket, body: unknown): {
        ok: boolean;
    };
    handleDisconnect(socket: ChatSocket): void;
}
export {};
