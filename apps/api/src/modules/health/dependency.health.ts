import { connect } from 'node:net';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicatorService } from '@nestjs/terminus';
import type { Env } from '../../config/env.schema.js';

const TIMEOUT_MS = 2_000;

/**
 * Readiness checks for infrastructure the API depends on.
 * Postgres is checked at the TCP level until Prisma is added; then switch to a `SELECT 1`.
 */
@Injectable()
export class DependencyHealthIndicator {
  constructor(
    private readonly health: HealthIndicatorService,
    private readonly config: ConfigService<Env, true>,
  ) {}

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
      .attempt(({ signal }) =>
        tcpProbe(url.hostname, Number(url.port || 6379), signal, {
          send: 'PING\r\n',
          expect: '+PONG',
        }),
      )
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
}

async function httpProbe(url: URL, signal: AbortSignal): Promise<void> {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`${url.origin} responded ${res.status}`);
  }
}

/** Node reports IPv4+IPv6 connection failures as an opaque AggregateError; surface the code. */
function describeSocketError(err: Error, host: string, port: number): Error {
  const first: unknown = err instanceof AggregateError ? err.errors[0] : err;
  const code =
    first instanceof Error && 'code' in first && typeof first.code === 'string'
      ? first.code
      : err.message;
  return new Error(`${code} ${host}:${port}`);
}

function tcpProbe(
  host: string,
  port: number,
  signal: AbortSignal,
  handshake?: { send: string; expect: string },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = connect({ host, port, signal });
    const done = (err?: Error) => {
      socket.destroy();
      if (err) reject(describeSocketError(err, host, port));
      else resolve();
    };
    socket.once('error', done);
    socket.once('connect', () => {
      if (!handshake) {
        done();
        return;
      }
      socket.write(handshake.send);
      socket.once('data', (chunk) => {
        done(
          chunk.toString().startsWith(handshake.expect)
            ? undefined
            : new Error(`Unexpected reply from ${host}:${port}`),
        );
      });
    });
  });
}
