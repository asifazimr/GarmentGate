var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailTransport_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
let MailTransport = MailTransport_1 = class MailTransport {
    logger = new Logger(MailTransport_1.name);
    resend;
    from;
    constructor(config) {
        const apiKey = config.get('RESEND_API_KEY', { infer: true });
        this.resend = apiKey ? new Resend(apiKey) : null;
        this.from = config.get('EMAIL_FROM', { infer: true });
    }
    async send(to, email) {
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
        if (error)
            throw new Error(`Resend rejected email: ${error.name}: ${error.message}`);
    }
};
MailTransport = MailTransport_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], MailTransport);
export { MailTransport };
//# sourceMappingURL=mail.transport.js.map