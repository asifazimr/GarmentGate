import { HealthCheckService } from '@nestjs/terminus';
import { type HealthResponse } from '@garmentgate/shared';
import { DependencyHealthIndicator } from './dependency.health.js';
export declare class HealthController {
    private readonly health;
    private readonly dependencies;
    constructor(health: HealthCheckService, dependencies: DependencyHealthIndicator);
    live(): HealthResponse;
    ready(): Promise<import("@nestjs/terminus").HealthCheckResult<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"storage"> & import("@nestjs/terminus").HealthIndicatorResult<"meilisearch"> & import("@nestjs/terminus").HealthIndicatorResult<"redis"> & import("@nestjs/terminus").HealthIndicatorResult<"postgres">, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"storage"> & import("@nestjs/terminus").HealthIndicatorResult<"meilisearch"> & import("@nestjs/terminus").HealthIndicatorResult<"redis"> & import("@nestjs/terminus").HealthIndicatorResult<"postgres">> | undefined, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"storage"> & import("@nestjs/terminus").HealthIndicatorResult<"meilisearch"> & import("@nestjs/terminus").HealthIndicatorResult<"redis"> & import("@nestjs/terminus").HealthIndicatorResult<"postgres">> | undefined>>;
}
