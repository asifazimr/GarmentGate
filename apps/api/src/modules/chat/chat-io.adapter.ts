import type { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';
import type { Server, ServerOptions } from 'socket.io';
import type { Env } from '../../config/env.schema.js';

/**
 * Socket.io with the same origin policy as HTTP CORS. The handshake authenticates with the
 * httpOnly access cookie, so refusing foreign origins blocks cross-site WebSocket hijacking.
 *
 * Events are fanned out through Redis, so with several API instances a message pushed by one
 * still reaches people connected to another.
 */
export class ChatIoAdapter extends IoAdapter {
  private readonly origins: string[];
  private readonly redisUrl: string;
  private readonly clients: Redis[] = [];

  constructor(app: INestApplicationContext) {
    super(app);
    const config = app.get(ConfigService<Env, true>);
    this.origins = config.get('CORS_ORIGINS', { infer: true });
    this.redisUrl = config.get('REDIS_URL', { infer: true });
  }

  override createIOServer(port: number, options?: ServerOptions): Server {
    const allowRequest: ServerOptions['allowRequest'] = (req, callback) => {
      const origin = req.headers.origin;
      // Same-origin requests through the web app's proxy and server-side clients may send none.
      callback(null, origin === undefined || this.origins.includes(origin));
    };
    // Nest always passes the gateway's options (path etc.).
    const server = super.createIOServer(
      port,
      options && { ...options, cors: { origin: this.origins, credentials: true }, allowRequest },
    );
    const pub = new Redis(this.redisUrl);
    const sub = pub.duplicate();
    this.clients.push(pub, sub);
    server.adapter(createAdapter(pub, sub));
    return server;
  }

  override async close(server: Server): Promise<void> {
    await super.close(server);
    await Promise.all(this.clients.map((c) => c.quit().catch(() => undefined)));
  }
}
