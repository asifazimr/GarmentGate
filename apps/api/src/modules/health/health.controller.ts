import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { type HealthResponse, HealthResponseSchema } from '@garmentgate/shared';
import { Public } from '../auth/auth.decorators.js';
import { DependencyHealthIndicator } from './dependency.health.js';

const SERVICE_NAME = 'api';
const VERSION = process.env.npm_package_version ?? '0.0.0';

@ApiTags('health')
@Public()
@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dependencies: DependencyHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Liveness: the API process is up' })
  @ApiOkResponse({ standardSchema: HealthResponseSchema })
  live(): HealthResponse {
    return {
      status: 'ok',
      service: SERVICE_NAME,
      version: VERSION,
      uptimeSeconds: Math.round(process.uptime() * 100) / 100,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({
    summary: 'Readiness: Postgres, Redis, Meilisearch and object storage are reachable',
  })
  @ApiServiceUnavailableResponse({ description: 'One or more dependencies are down' })
  ready() {
    return this.health.check([
      () => this.dependencies.postgres(),
      () => this.dependencies.redis(),
      () => this.dependencies.meilisearch(),
      () => this.dependencies.storage(),
    ]);
  }
}
