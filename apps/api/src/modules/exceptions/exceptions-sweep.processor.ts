import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Job, Queue } from 'bullmq';
import type { Env } from '../../config/env.schema.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { ExceptionsService } from './exceptions.service.js';

export const EXCEPTIONS_QUEUE = 'order-exceptions';

/** Checks every hour for orders a week or more late (one alert a week each). */
@Processor(EXCEPTIONS_QUEUE, { concurrency: 1 })
export class ExceptionsSweepProcessor extends MonitoredWorker {
  private readonly logger = new Logger(ExceptionsSweepProcessor.name);

  constructor(private readonly exceptions: ExceptionsService) {
    super();
  }

  async process(_job: Job): Promise<void> {
    const alerted = await this.exceptions.sweep();
    if (alerted > 0) this.logger.log(`Delay alerts sent for ${String(alerted)} orders`);
  }
}

@Injectable()
export class ExceptionsSweepScheduler implements OnApplicationBootstrap {
  constructor(
    @InjectQueue(EXCEPTIONS_QUEUE) private readonly queue: Queue,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    // Tests run the sweep themselves.
    if (this.config.get('NODE_ENV', { infer: true }) === 'test') return;
    await this.queue.upsertJobScheduler(
      'exceptions-sweep',
      { every: 60 * 60_000 },
      { name: 'sweep', opts: { removeOnComplete: 100, removeOnFail: 500 } },
    );
  }
}
