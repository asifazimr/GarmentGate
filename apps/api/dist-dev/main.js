import './instrument.js';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './bootstrap.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true, rawBody: true });
    configureApp(app);
    const port = app.get(ConfigService).get('PORT', { infer: true });
    await app.listen(port);
}
await bootstrap();
//# sourceMappingURL=main.js.map