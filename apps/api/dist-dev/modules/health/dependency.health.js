var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { connect } from 'node:net';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicatorService } from '@nestjs/terminus';
const TIMEOUT_MS = 2_000;
let DependencyHealthIndicator = class DependencyHealthIndicator {
    health;
    config;
    constructor(health, config) {
        this.health = health;
        this.config = config;
    }
    postgres() {
        const url = new URL(this.config.get('DATABASE_URL', { infer: true }));
        return this.health
            .check('postgres')
            .attempt(({ signal }) => tcpProbe(url.hostname, Number(url.port || 5432), signal))
            .withTimeout(TIMEOUT_MS);
    }
    redis() {
        const url = new URL(this.config.get('REDIS_URL', { infer: true }));
        return this.health
            .check('redis')
            .attempt(({ signal }) => tcpProbe(url.hostname, Number(url.port || 6379), signal, {
            send: 'PING\r\n',
            expect: '+PONG',
        }))
            .withTimeout(TIMEOUT_MS);
    }
    meilisearch() {
        const host = this.config.get('MEILISEARCH_HOST', { infer: true });
        return this.health
            .check('meilisearch')
            .attempt(({ signal }) => httpProbe(new URL('/health', host), signal))
            .withTimeout(TIMEOUT_MS);
    }
    storage() {
        const endpoint = this.config.get('S3_ENDPOINT', { infer: true });
        return this.health
            .check('storage')
            .attempt(({ signal }) => httpProbe(new URL('/minio/health/live', endpoint), signal))
            .withTimeout(TIMEOUT_MS);
    }
};
DependencyHealthIndicator = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HealthIndicatorService,
        ConfigService])
], DependencyHealthIndicator);
export { DependencyHealthIndicator };
async function httpProbe(url, signal) {
    const res = await fetch(url, { signal });
    if (!res.ok) {
        throw new Error(`${url.origin} responded ${res.status}`);
    }
}
function describeSocketError(err, host, port) {
    const first = err instanceof AggregateError ? err.errors[0] : err;
    const code = first instanceof Error && 'code' in first && typeof first.code === 'string'
        ? first.code
        : err.message;
    return new Error(`${code} ${host}:${port}`);
}
function tcpProbe(host, port, signal, handshake) {
    return new Promise((resolve, reject) => {
        const socket = connect({ host, port, signal });
        const done = (err) => {
            socket.destroy();
            if (err)
                reject(describeSocketError(err, host, port));
            else
                resolve();
        };
        socket.once('error', done);
        socket.once('connect', () => {
            if (!handshake) {
                done();
                return;
            }
            socket.write(handshake.send);
            socket.once('data', (chunk) => {
                done(chunk.toString().startsWith(handshake.expect)
                    ? undefined
                    : new Error(`Unexpected reply from ${host}:${port}`));
            });
        });
    });
}
//# sourceMappingURL=dependency.health.js.map