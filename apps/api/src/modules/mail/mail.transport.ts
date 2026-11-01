import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RenderedEmail } from '@garmentgate/emails';
import { Resend } from 'resend';
import type { Env } from '../../config/env.schema.js';

/** Sends through Resend, or logs the email in development when no API key is configured. */
@Injectable()
export class MailTransport {
  private readonly logger = new Logger(MailTransport.name);
  private readonly resend: Resend | null;
  private readonly from: string;

  constructor(config: ConfigService<Env, true>) {
    const apiKey = config.get('RESEND_API_KEY', { infer: true });
    this.resend = apiKey ? new Resend(apiKey) : null;
    this.from = config.get('EMAIL_FROM', { infer: true });
  }

  async send(to: string, email: RenderedEmail): Promise<void> {
    if (!this.resend) {
      this.logger.warn(`[dev email] to=${to} subject="${email.subject}"\n${email.text}`);
      return;
    }
    const { error } = await this.resend.emails.send({
      from: this.from,
      to,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (error) throw new Error(`Resend rejected email: ${error.name}: ${error.message}`);
  }
}
