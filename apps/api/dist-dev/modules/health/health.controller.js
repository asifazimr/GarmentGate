var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags, } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { HealthResponseSchema } from '@garmentgate/shared';
import { Public } from '../auth/auth.decorators.js';
import { DependencyHealthIndicator } from './dependency.health.js';
const SERVICE_NAME = 'api';
const VERSION = process.env.npm_package_version ?? '0.0.0';
let HealthController = class HealthController {
    health;
    dependencies;
    constructor(health, dependencies) {
        this.health = health;
        this.dependencies = dependencies;
    }
    live() {
        return {
            status: 'ok',
            service: SERVICE_NAME,
            version: VERSION,
            uptimeSeconds: Math.round(process.uptime() * 100) / 100,
            timestamp: new Date().toISOString(),
        };
    }
    ready() {
        return this.health.check([
            () => this.dependencies.postgres(),
            () => this.dependencies.redis(),
            () => this.dependencies.meilisearch(),
            () => this.dependencies.storage(),
        ]);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Liveness: the API process is up' }),
    ApiOkResponse({ standardSchema: HealthResponseSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "live", null);
__decorate([
    Get('ready'),
    HealthCheck(),
    ApiOperation({
        summary: 'Readiness: Postgres, Redis, Meilisearch and object storage are reachable',
    }),
    ApiServiceUnavailableResponse({ description: 'One or more dependencies are down' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "ready", null);
HealthController = __decorate([
    ApiTags('health'),
    Public(),
    SkipThrottle(),
    Controller('health'),
    __metadata("design:paramtypes", [HealthCheckService,
        DependencyHealthIndicator])
], HealthController);
export { HealthController };
//# sourceMappingURL=health.controller.js.map