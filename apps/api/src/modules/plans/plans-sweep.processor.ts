import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Job, Queue } from 'bullmq';
import type { Env } from '../../config/env.schema.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { PlansService } from './plans.service.js';

export const PLANS_QUEUE = 'factory-plans';

/** Every five minutes: lapsed plans fall back to Free; head-start waits end and are announced. */
@Processor(PLANS_QUEUE, { concurrency: 1 })
export class PlansSweepProcessor extends MonitoredWorker {
  private readonly logger = new Logger(PlansSweepProcessor.name);

  constructor(private readonly plans: PlansService) {
    super();
  }

  async process(_job: Job): Promise<void> {
    const { changed, announced } = await this.plans.sweep();
    if (changed + announced > 0)
      this.logger.log(`Plans changed: ${String(changed)}, RFQs announced: ${String(announced)}`);
  }
}

@Injectable()
export class PlansSweepScheduler implements OnApplicationBootstrap {
  constructor(
    @InjectQueue(PLANS_QUEUE) private readonly queue: Queue,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    // Tests run the sweep themselves.
    if (this.config.get('NODE_ENV', { infer: true }) === 'test') return;
    await this.queue.upsertJobScheduler(
      'plans-sweep',
      { every: 5 * 60_000 },
      { name: 'sweep', opts: { removeOnComplete: 100, removeOnFail: 500 } },
    );
  }
}
