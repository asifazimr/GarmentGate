import { createParamDecorator, SetMetadata, UnauthorizedException, } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'auth:isPublic';
export const ROLES_KEY = 'auth:roles';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
export const AnyRole = () => Roles('BUYER', 'MANUFACTURER', 'ADMIN', 'INSPECTOR', 'PARTNER');
export const CurrentUser = createParamDecorator((_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user)
        throw new UnauthorizedException();
    return req.user;
});
//# sourceMappingURL=auth.decorators.js.map