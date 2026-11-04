import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Job, Queue } from 'bullmq';
import type { Env } from '../../config/env.schema.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';

export const CAPACITY_QUEUE = 'capacity-booking';

/** Runs the booking sweep (reminders, expiry, order links) every minute, once across instances. */
@Processor(CAPACITY_QUEUE, { concurrency: 1 })
export class BookingSweepProcessor extends MonitoredWorker {
  private readonly logger = new Logger(BookingSweepProcessor.name);

  constructor(
    private readonly bookings: BookingsService,
    private readonly partnerships: PartnershipsService,
  ) {
    super();
  }

  async process(_job: Job): Promise<void> {
    const result = await this.bookings.sweep();
    const ended = await this.partnerships.endFinished();
    if (result.expired + result.reminded + result.linked + ended > 0)
      this.logger.log(
        `Capacity sweep: ${String(result.reminded)} reminded, ${String(result.expired)} expired, ${String(result.linked)} linked, ${String(ended)} partnerships ended`,
      );
  }
}

@Injectable()
export class BookingSweepScheduler implements OnApplicationBootstrap {
  constructor(
    @InjectQueue(CAPACITY_QUEUE) private readonly queue: Queue,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    // Tests run the sweep themselves, at the time they choose.
    if (this.config.get('NODE_ENV', { infer: true }) === 'test') return;
    await this.queue.upsertJobScheduler(
      'capacity-sweep',
      { every: 60_000 },
      { name: 'sweep', opts: { removeOnComplete: 100, removeOnFail: 500 } },
    );
  }
}
