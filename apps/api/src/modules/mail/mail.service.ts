import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import type { EmailTemplateName, EmailTemplates } from '@garmentgate/emails';
import type { Queue } from 'bullmq';

export const MAIL_QUEUE = 'mail';

export interface MailJob<K extends EmailTemplateName = EmailTemplateName> {
  template: K;
  to: string;
  props: EmailTemplates[K];
}

/** Enqueues emails; MailProcessor renders and sends them with retries. */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(@InjectQueue(MAIL_QUEUE) private readonly queue: Queue<MailJob>) {}

  async send<K extends EmailTemplateName>(
    template: K,
    to: string,
    props: EmailTemplates[K],
  ): Promise<void> {
    try {
      await this.queue.add(
        template,
        { template, to, props },
        {
          attempts: 5,
          backoff: { type: 'exponential', delay: 5_000 },
          removeOnComplete: 1_000,
          removeOnFail: 5_000,
        },
      );
    } catch (error) {
      // Never fail the user's request because the queue is unavailable; they can resend.
      this.logger.error({ err: error, template }, 'Failed to enqueue email');
    }
  }
}
