import type { Server } from 'socket.io';
export declare class RealtimeService {
    private server;
    attach(server: Server): void;
    toUser(userId: string, event: string, payload: unknown): void;
}
