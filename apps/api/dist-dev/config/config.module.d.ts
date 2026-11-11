import { ConfigService } from '@nestjs/config';
import { type Env } from './env.schema.js';
export type AppConfigService = ConfigService<Env, true>;
export declare class AppConfigModule {
}
