import type { ConfigService } from '@nestjs/config';
import type { TextChannel } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
export interface TextMessage {
    channel: TextChannel;
    to: string;
    body: string;
    contentSid?: string;
    contentVariables?: Record<string, string>;
}
export interface TextResult {
    providerRef: string | null;
    ok: boolean;
    error?: string;
}
export interface TextProvider {
    readonly live: boolean;
    supports(channel: TextChannel): boolean;
    send(message: TextMessage): Promise<TextResult>;
}
export declare const TEXT_PROVIDER: unique symbol;
export declare class ConsoleTextProvider implements TextProvider {
    readonly live = false;
    private readonly logger;
    supports(): boolean;
    send(message: TextMessage): Promise<TextResult>;
}
export declare class TwilioTextProvider implements TextProvider {
    private readonly accountSid;
    private readonly authToken;
    private readonly from;
    readonly live = true;
    constructor(accountSid: string, authToken: string, from: {
        messagingServiceSid?: string;
        sms?: string;
        whatsapp?: string;
        statusCallback?: string;
    });
    supports(channel: TextChannel): boolean;
    send(m: TextMessage): Promise<TextResult>;
}
export declare function textProviderFactory(config: ConfigService<Env, true>): TextProvider;
export declare function twilioSignatureValid(authToken: string, url: string, params: Record<string, string>, signature: string): boolean;
