import type { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import type { Server, ServerOptions } from 'socket.io';
import type { Env } from '../../config/env.schema.js';

/**
 * Socket.io with the same origin policy as HTTP CORS. The handshake authenticates with the
 * httpOnly access cookie, so refusing foreign origins blocks cross-site WebSocket hijacking.
 */
export class ChatIoAdapter extends IoAdapter {
  private readonly origins: string[];

  constructor(app: INestApplicationContext) {
    super(app);
    this.origins = app.get(ConfigService<Env, true>).get('CORS_ORIGINS', { infer: true });
  }

  override createIOServer(port: number, options?: ServerOptions): Server {
    const allowRequest: ServerOptions['allowRequest'] = (req, callback) => {
      const origin = req.headers.origin;
      // Same-origin requests through the web app's proxy and server-side clients may send none.
      callback(null, origin === undefined || this.origins.includes(origin));
    };
    // Nest always passes the gateway's options (path etc.).
    return super.createIOServer(
      port,
      options && { ...options, cors: { origin: this.origins, credentials: true }, allowRequest },
    );
  }
}
