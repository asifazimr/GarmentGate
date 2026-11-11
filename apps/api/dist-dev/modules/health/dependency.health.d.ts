import { ConfigService } from '@nestjs/config';
import { HealthIndicatorService } from '@nestjs/terminus';
import type { Env } from '../../config/env.schema.js';
export declare class DependencyHealthIndicator {
    private readonly health;
    private readonly config;
    constructor(health: HealthIndicatorService, config: ConfigService<Env, true>);
    postgres(): import("@nestjs/terminus").HealthCheckAttempt<"postgres">;
    redis(): import("@nestjs/terminus").HealthCheckAttempt<"redis">;
    meilisearch(): import("@nestjs/terminus").HealthCheckAttempt<"meilisearch">;
    storage(): import("@nestjs/terminus").HealthCheckAttempt<"storage">;
}
