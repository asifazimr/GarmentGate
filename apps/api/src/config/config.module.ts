import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type Env, EnvSchema } from './env.schema.js';

/** Typed accessor: `config.get('PORT', { infer: true })` returns `number`. */
export type AppConfigService = ConfigService<Env, true>;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: EnvSchema,
    }),
  ],
})
export class AppConfigModule {}
