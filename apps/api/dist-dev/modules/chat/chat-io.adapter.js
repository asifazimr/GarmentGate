import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';
export class ChatIoAdapter extends IoAdapter {
    origins;
    redisUrl;
    clients = [];
    constructor(app) {
        super(app);
        const config = app.get((ConfigService));
        this.origins = config.get('CORS_ORIGINS', { infer: true });
        this.redisUrl = config.get('REDIS_URL', { infer: true });
    }
    createIOServer(port, options) {
        const allowRequest = (req, callback) => {
            const origin = req.headers.origin;
            callback(null, origin === undefined || this.origins.includes(origin));
        };
        const server = super.createIOServer(port, options && { ...options, cors: { origin: this.origins, credentials: true }, allowRequest });
        const pub = new Redis(this.redisUrl);
        const sub = pub.duplicate();
        this.clients.push(pub, sub);
        server.adapter(createAdapter(pub, sub));
        return server;
    }
    async close(server) {
        await super.close(server);
        await Promise.all(this.clients.map((c) => c.quit().catch(() => undefined)));
    }
}
//# sourceMappingURL=chat-io.adapter.js.map