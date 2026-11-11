const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const EXEMPT_PATHS = ['/payments/stripe/webhook', '/messaging/twilio/status'];
export function checkOrigin(req, allowed) {
    if (SAFE_METHODS.has(req.method.toUpperCase()))
        return 'allow';
    if (EXEMPT_PATHS.some((p) => req.path === p))
        return 'allow';
    const origin = header(req.headers.origin);
    if (origin !== undefined)
        return allowed.includes(origin) ? 'allow' : 'deny';
    return header(req.headers['sec-fetch-site']) === 'cross-site' ? 'deny' : 'allow';
}
const header = (value) => (Array.isArray(value) ? value[0] : value);
export function originCheckMiddleware(allowed) {
    return (req, res, next) => {
        if (checkOrigin(req, allowed) === 'allow') {
            next();
            return;
        }
        res.status(403).json({ statusCode: 403, message: 'Cross-site request refused' });
    };
}
//# sourceMappingURL=origin-check.js.map