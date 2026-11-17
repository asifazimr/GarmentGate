import { createSign, randomBytes } from 'node:crypto';
import type { ConfigService } from '@nestjs/config';
import type { Env } from '../../config/env.schema.js';

export interface VideoInput {
  inputId: string;
  rtmpsUrl: string;
  streamKey: string;
}

export interface VideoRecording {
  videoId: string;
  startedAt: Date;
  durationSeconds: number | null;
}

/** Where cameras stream to and how viewers watch. One live input per camera. */
export interface VideoProvider {
  /** Real streaming (credentials set) vs the development stand-in. */
  readonly live: boolean;
  createInput(name: string): Promise<VideoInput>;
  deleteInput(inputId: string): Promise<void>;
  isLive(inputId: string): Promise<boolean>;
  recordings(inputId: string): Promise<VideoRecording[]>;
  /** A signed HLS link to a live input or a recording, valid for `ttlSeconds`. */
  playbackUrl(id: string, ttlSeconds: number): string;
}

export const VIDEO_PROVIDER = Symbol('VIDEO_PROVIDER');

/**
 * Development and unconfigured environments: ingest details that go nowhere, every camera
 * "live", and a public test stream for playback so the player can be tried end to end.
 */
export class DevVideoProvider implements VideoProvider {
  readonly live = false;
  static readonly DEMO_STREAM = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  createInput(): Promise<VideoInput> {
    return Promise.resolve({
      inputId: `dev-${randomBytes(8).toString('hex')}`,
      rtmpsUrl: 'rtmps://live.example.invalid:443/live/',
      streamKey: randomBytes(16).toString('hex'),
    });
  }

  deleteInput(): Promise<void> {
    return Promise.resolve();
  }

  isLive(): Promise<boolean> {
    return Promise.resolve(true);
  }

  recordings(): Promise<VideoRecording[]> {
    return Promise.resolve([]);
  }

  playbackUrl(): string {
    return DevVideoProvider.DEMO_STREAM;
  }
}

interface CfEnvelope<T> {
  success: boolean;
  result: T;
  errors?: { message: string }[];
}

/**
 * Cloudflare Stream: one live input per camera (RTMPS ingest, automatic recording, signed URLs
 * required), live state from the public lifecycle endpoint, recordings from the input's video
 * list, and playback tokens signed locally with a Stream signing key (RS256) so watching never
 * hits the rate-limited token API.
 */
export class CloudflareStreamProvider implements VideoProvider {
  readonly live = true;
  private readonly api: string;
  private readonly key: string;

  constructor(
    accountId: string,
    private readonly token: string,
    private readonly customerCode: string,
    private readonly signingKeyId: string,
    signingKeyPemBase64: string,
  ) {
    this.api = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`;
    this.key = Buffer.from(signingKeyPemBase64, 'base64').toString('utf8');
  }

  private async call<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.api}${path}`, {
      ...init,
      headers: { authorization: `Bearer ${this.token}`, 'content-type': 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await res.json().catch(() => null)) as CfEnvelope<T> | null;
    if (!res.ok || !body?.success)
      throw new Error(`Cloudflare Stream ${path}: ${body?.errors?.[0]?.message ?? res.status}`);
    return body.result;
  }

  private get host() {
    return `https://customer-${this.customerCode}.cloudflarestream.com`;
  }

  async createInput(name: string): Promise<VideoInput> {
    const input = await this.call<{ uid: string; rtmps: { url: string; streamKey: string } }>(
      '/live_inputs',
      {
        method: 'POST',
        body: JSON.stringify({
          meta: { name },
          recording: { mode: 'automatic', requireSignedURLs: true },
          deleteRecordingAfterDays: 90,
        }),
      },
    );
    return { inputId: input.uid, rtmpsUrl: input.rtmps.url, streamKey: input.rtmps.streamKey };
  }

  async deleteInput(inputId: string): Promise<void> {
    await this.call(`/live_inputs/${inputId}`, { method: 'DELETE' }).catch(() => undefined);
  }

  async isLive(inputId: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.host}/${inputId}/lifecycle`, {
        signal: AbortSignal.timeout(5_000),
      });
      const body = (await res.json()) as { live?: boolean };
      return body.live === true;
    } catch {
      return false;
    }
  }

  async recordings(inputId: string): Promise<VideoRecording[]> {
    const videos = await this.call<
      { uid: string; created: string; duration: number; readyToStream: boolean }[]
    >(`/live_inputs/${inputId}/videos`);
    return videos
      .filter((v) => v.readyToStream)
      .map((v) => ({
        videoId: v.uid,
        startedAt: new Date(v.created),
        durationSeconds: v.duration > 0 ? Math.round(v.duration) : null,
      }));
  }

  playbackUrl(id: string, ttlSeconds: number): string {
    return `${this.host}/${signStreamToken(id, this.signingKeyId, this.key, ttlSeconds)}/manifest/video.m3u8`;
  }
}

const b64url = (data: string | Buffer) => Buffer.from(data).toString('base64url');

/** A Cloudflare Stream signed-URL token: RS256 JWT with `sub` = the video or live input id. */
export function signStreamToken(
  id: string,
  keyId: string,
  privateKeyPem: string,
  ttlSeconds: number,
  now = Date.now(),
): string {
  const header = b64url(JSON.stringify({ alg: 'RS256', kid: keyId }));
  const payload = b64url(
    JSON.stringify({ sub: id, kid: keyId, exp: Math.floor(now / 1000) + ttlSeconds }),
  );
  const signature = createSign('RSA-SHA256').update(`${header}.${payload}`).sign(privateKeyPem);
  return `${header}.${payload}.${b64url(signature)}`;
}

export function videoProviderFactory(config: ConfigService<Env, true>): VideoProvider {
  const token = config.get('CLOUDFLARE_STREAM_API_TOKEN', { infer: true });
  const account = config.get('CLOUDFLARE_ACCOUNT_ID', { infer: true });
  const code = config.get('CLOUDFLARE_STREAM_CUSTOMER_CODE', { infer: true });
  const keyId = config.get('CLOUDFLARE_STREAM_SIGNING_KEY_ID', { infer: true });
  const pem = config.get('CLOUDFLARE_STREAM_SIGNING_KEY_PEM', { infer: true });
  if (!token || !account || !code || !keyId || !pem) return new DevVideoProvider();
  return new CloudflareStreamProvider(account, token, code, keyId, pem);
}
