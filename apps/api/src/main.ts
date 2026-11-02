// Must come first: error monitoring instruments modules as they load.
import './instrument.js';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './bootstrap.js';
import type { AppConfigService } from './config/config.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, rawBody: true });
  configureApp(app);

  const port = app.get<AppConfigService>(ConfigService).get('PORT', { infer: true });
  await app.listen(port);
}

await bootstrap();
