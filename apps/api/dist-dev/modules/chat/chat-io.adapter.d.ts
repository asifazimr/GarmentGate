import type { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import type { Server, ServerOptions } from 'socket.io';
export declare class ChatIoAdapter extends IoAdapter {
    private readonly origins;
    private readonly redisUrl;
    private readonly clients;
    constructor(app: INestApplicationContext);
    createIOServer(port: number, options?: ServerOptions): Server;
    close(server: Server): Promise<void>;
}
