var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import * as Sentry from '@sentry/nestjs';
export class MonitoredWorker extends WorkerHost {
    onFailed(job, error) {
        if (!job || job.attemptsMade < (job.opts.attempts ?? 1))
            return;
        Sentry.captureException(error, {
            tags: { queue: job.queueName, job: job.name },
            extra: { jobId: job.id, attempts: job.attemptsMade },
        });
    }
}
__decorate([
    OnWorkerEvent('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], MonitoredWorker.prototype, "onFailed", null);
//# sourceMappingURL=monitored-worker.js.map