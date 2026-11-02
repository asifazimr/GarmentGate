import { type ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Global rate limit for HTTP routes. Socket events are throttled in the chat gateway.
 *
 * Signed-in requests are counted per user (the auth guard runs first and sets `req.user`), so a
 * shared office IP doesn't throttle a whole team and one account can't spread a flood across
 * IPs. Anonymous requests are counted per client IP (`trust proxy` resolves it behind proxies).
 */
@Injectable()
export class HttpThrottlerGuard extends ThrottlerGuard {
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;
    return super.canActivate(context);
  }

  protected override getTracker(req: Record<string, unknown>): Promise<string> {
    const user = req.user as { id?: string } | undefined;
    const ip = typeof req.ip === 'string' ? req.ip : 'unknown';
    return Promise.resolve(user?.id ? `user:${user.id}` : `ip:${ip}`);
  }
}
