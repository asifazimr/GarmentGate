import { randomUUID } from 'node:crypto';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import type { AppConfigService } from '../../config/config.module.js';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: AppConfigService) => {
        const isDev = config.get('NODE_ENV', { infer: true }) === 'development';
        return {
          pinoHttp: {
            level: config.get('LOG_LEVEL', { infer: true }),
            genReqId: (req, res) => {
              const incoming = req.headers['x-request-id'];
              const id =
                typeof incoming === 'string' && incoming.length > 0 ? incoming : randomUUID();
              res.setHeader('x-request-id', id);
              return id;
            },
            // Never log credentials or session tokens.
            redact: [
              'req.headers.authorization',
              'req.headers.cookie',
              'res.headers["set-cookie"]',
            ],
            autoLogging: {
              ignore: (req) => req.url?.startsWith('/health') ?? false,
            },
            ...(isDev && {
              transport: { target: 'pino-pretty', options: { singleLine: true } },
            }),
          },
        };
      },
    }),
  ],
})
export class LoggingModule {}
