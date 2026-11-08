import { Processor } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { type TextJob, TEXTS_QUEUE } from '../notifications/texts.js';
import { MessagingService } from './messaging.service.js';

/** Sends the texts the Notifier queues (retried on provider errors). */
@Processor(TEXTS_QUEUE, { concurrency: 4 })
export class TextsProcessor extends MonitoredWorker {
  constructor(private readonly messaging: MessagingService) {
    super();
  }

  async process(job: Job<TextJob>): Promise<void> {
    await this.messaging.deliver(job.data);
  }
}
