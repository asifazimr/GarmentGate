import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { z } from 'zod';
import { originCheckMiddleware } from './common/security/origin-check.js';
import { ChatIoAdapter } from './modules/chat/chat-io.adapter.js';
export function parseTrustProxy(value) {
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    return /^\d+$/.test(value) ? Number(value) : value;
}
export function configureApp(app) {
    const config = app.get(ConfigService);
    app.set('trust proxy', parseTrustProxy(config.get('TRUST_PROXY', { infer: true })));
    app.useLogger(app.get(Logger));
    app.use(helmet());
    app.use(cookieParser());
    const origins = config.get('CORS_ORIGINS', { infer: true });
    app.enableCors({ origin: origins, credentials: true });
    app.use(originCheckMiddleware(origins));
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
        const createDocument = () => SwaggerModule.createDocument(app, document, {
            standardSchemaConverter: (schema, { schemaType }) => schema instanceof z.ZodType
                ? { schema: z.toJSONSchema(schema, { io: schemaType, unrepresentable: 'any' }) }
                : undefined,
        });
        SwaggerModule.setup('docs', app, createDocument, {
            jsonDocumentUrl: 'docs/json',
        });
    }
}
//# sourceMappingURL=bootstrap.js.map