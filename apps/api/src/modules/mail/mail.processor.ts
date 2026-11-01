import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { renderEmail } from '@garmentgate/emails';
import type { Job } from 'bullmq';
import { MAIL_QUEUE, type MailJob } from './mail.service.js';
import { MailTransport } from './mail.transport.js';

@Processor(MAIL_QUEUE)
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly transport: MailTransport) {
    super();
  }

  async process(job: Job<MailJob>): Promise<void> {
    const { template, to, props } = job.data;
    const email = await renderEmail(template, props);
    await this.transport.send(to, email);
    this.logger.log(`Sent ${template} email (job ${job.id ?? '?'})`);
  }
}
