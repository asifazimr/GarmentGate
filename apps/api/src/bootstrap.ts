import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import type { AppConfigService } from './config/config.module.js';

/**
 * Cross-cutting HTTP setup shared by `main.ts` and e2e tests,
 * so tests exercise the same middleware stack as production.
 */
export function configureApp(app: INestApplication): void {
  const config = app.get<AppConfigService>(ConfigService);

  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.enableCors({
    origin: config.get('CORS_ORIGINS', { infer: true }),
    credentials: true,
  });
  app.enableShutdownHooks();

  if (config.get('SWAGGER_ENABLED', { infer: true })) {
    const document = new DocumentBuilder()
      .setTitle('GarmentGate API')
      .setDescription('Managed B2B garment marketplace API')
      .setVersion(process.env.npm_package_version ?? '0.0.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup('docs', app, () => SwaggerModule.createDocument(app, document), {
      jsonDocumentUrl: 'docs/json',
    });
  }
}
