import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DependencyHealthIndicator } from './dependency.health.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [TerminusModule.forRoot({ logger: false })],
  controllers: [HealthController],
  providers: [DependencyHealthIndicator],
})
export class HealthModule {}
