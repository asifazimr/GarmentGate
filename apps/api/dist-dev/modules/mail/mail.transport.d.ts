import { ConfigService } from '@nestjs/config';
import type { RenderedEmail } from '@garmentgate/emails';
import type { Env } from '../../config/env.schema.js';
export declare class MailTransport {
    private readonly logger;
    private readonly resend;
    private readonly from;
    constructor(config: ConfigService<Env, true>);
    send(to: string, email: RenderedEmail): Promise<void>;
}
