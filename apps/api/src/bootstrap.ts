import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { z } from 'zod';
import type { AppConfigService } from './config/config.module.js';
import { originCheckMiddleware } from './common/security/origin-check.js';
import { ChatIoAdapter } from './modules/chat/chat-io.adapter.js';

/**
 * Express "trust proxy" from TRUST_PROXY: `true`/`false`, a hop count (`1` = one load balancer in
 * front) or addresses/presets (`loopback`, `10.0.0.0/8`). Express reads a numeric *string* as an
 * address, so hop counts must be numbers.
 */
export function parseTrustProxy(value: string): boolean | number | string {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return /^\d+$/.test(value) ? Number(value) : value;
}

/**
 * Cross-cutting HTTP setup shared by `main.ts` and e2e tests,
 * so tests exercise the same middleware stack as production.
 */
export function configureApp(app: INestApplication): void {
  const config = app.get<AppConfigService>(ConfigService);
  (app as NestExpressApplication).set(
    'trust proxy',
    parseTrustProxy(config.get('TRUST_PROXY', { infer: true })),
  );

  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.use(cookieParser());
  const origins = config.get('CORS_ORIGINS', { infer: true });
  app.enableCors({ origin: origins, credentials: true });
  // CSRF defence in depth on top of SameSite=Lax cookies.
  app.use(originCheckMiddleware(origins));
  // Socket.io for chat, with the same allowed origins as CORS.
  app.useWebSocketAdapter(new ChatIoAdapter(app));
  app.enableShutdownHooks();

  if (config.get('SWAGGER_ENABLED', { infer: true })) {
    const document = new DocumentBuilder()
      .setTitle('GarmentGate API')
      .setDescription('Managed B2B garment marketplace API')
      .setVersion(process.env.npm_package_version ?? '0.0.0')
      .addBearerAuth()
      .addCookieAuth('gg_at')
      .build();
    const createDocument = () =>
      SwaggerModule.createDocument(app, document, {
        // Shared schemas use transforms (trim, coerce) that JSON Schema can't express;
        // document the shape the API receives and returns instead of failing.
        standardSchemaConverter: (schema, { schemaType }) =>
          schema instanceof z.ZodType
            ? { schema: z.toJSONSchema(schema, { io: schemaType, unrepresentable: 'any' }) }
            : undefined,
      });
    SwaggerModule.setup('docs', app, createDocument, {
      jsonDocumentUrl: 'docs/json',
    });
  }
}
