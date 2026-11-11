import type { NextFunction, Request, Response } from 'express';
export type OriginVerdict = 'allow' | 'deny';
export declare function checkOrigin(req: {
    method: string;
    path: string;
    headers: Record<string, string | string[] | undefined>;
}, allowed: readonly string[]): OriginVerdict;
export declare function originCheckMiddleware(allowed: readonly string[]): (req: Request, res: Response, next: NextFunction) => void;
