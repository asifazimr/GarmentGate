import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import type { Env } from '../../config/env.schema.js';

/**
 * BullMQ connection shared by every queue. BullMQ 6 no longer bundles ioredis and, under ESM,
 * needs a ready-made client rather than connection options.
 */
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        prefix: 'gg',
        // Workers block on Redis, so they must never give up on a request.
        connection: new Redis(config.get('REDIS_URL', { infer: true }), {
          maxRetriesPerRequest: null,
        }),
      }),
    }),
  ],
})
export class QueueModule {}
