import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import type { Env } from '../../config/env.schema.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { HttpThrottlerGuard } from '../../common/throttle/http-throttler.guard.js';
import { TokenService } from './token.service.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        secret: config.get('JWT_ACCESS_SECRET', { infer: true }),
        signOptions: { algorithm: 'HS256', issuer: 'garmentgate-api', audience: 'garmentgate' },
        verifyOptions: {
          algorithms: ['HS256'],
          issuer: 'garmentgate-api',
          audience: 'garmentgate',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    // Order matters: authenticate, check roles, then rate-limit, so the throttler counts
    // signed-in requests per user (anonymous ones per IP).
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: HttpThrottlerGuard },
  ],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
