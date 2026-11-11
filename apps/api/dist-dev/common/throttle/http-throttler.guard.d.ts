import { type ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
export declare class HttpThrottlerGuard extends ThrottlerGuard {
    canActivate(context: ExecutionContext): Promise<boolean>;
    protected getTracker(req: Record<string, unknown>): Promise<string>;
}
