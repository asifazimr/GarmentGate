import { createVerify, generateKeyPairSync } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { signStreamToken } from './video-provider.js';

describe('Cloudflare Stream signed tokens', () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const pem = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();

  it('signs an RS256 JWT for the video with a short expiry', () => {
    const now = Date.UTC(2026, 10, 17, 12, 0, 0);
    const token = signStreamToken('input-123', 'key-abc', pem, 1800, now);
    const [header, payload, signature] = token.split('.');
    expect(JSON.parse(Buffer.from(header ?? '', 'base64url').toString())).toEqual({
      alg: 'RS256',
      kid: 'key-abc',
    });
    expect(JSON.parse(Buffer.from(payload ?? '', 'base64url').toString())).toEqual({
      sub: 'input-123',
      kid: 'key-abc',
      exp: now / 1000 + 1800,
    });
    const ok = createVerify('RSA-SHA256')
      .update(`${header ?? ''}.${payload ?? ''}`)
      .verify(publicKey, Buffer.from(signature ?? '', 'base64url'));
    expect(ok).toBe(true);
  });
});
