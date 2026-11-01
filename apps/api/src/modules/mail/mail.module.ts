import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { MailProcessor } from './mail.processor.js';
import { MAIL_QUEUE, MailService } from './mail.service.js';
import { MailTransport } from './mail.transport.js';

@Global()
@Module({
  imports: [BullModule.registerQueue({ name: MAIL_QUEUE })],
  providers: [MailService, MailTransport, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
