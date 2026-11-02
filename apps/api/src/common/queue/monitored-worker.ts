import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import * as Sentry from '@sentry/nestjs';
import type { Job } from 'bullmq';

/**
 * A BullMQ worker whose jobs are reported to Sentry when they fail for good (after the last
 * retry). Only the queue, job name and id go along: payloads can hold user content.
 */
export abstract class MonitoredWorker extends WorkerHost {
  @OnWorkerEvent('failed')
  onFailed(job: Job | undefined, error: Error): void {
    if (!job || job.attemptsMade < (job.opts.attempts ?? 1)) return;
    Sentry.captureException(error, {
      tags: { queue: job.queueName, job: job.name },
      extra: { jobId: job.id, attempts: job.attemptsMade },
    });
  }
}
