var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, ROLES_KEY } from '../auth.decorators.js';
const DEFAULT_ROLES = ['BUYER', 'MANUFACTURER', 'ADMIN'];
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        if (context.getType() !== 'http')
            return true;
        const targets = [context.getHandler(), context.getClass()];
        const roles = this.reflector.getAllAndOverride(ROLES_KEY, targets);
        if (this.reflector.getAllAndOverride(IS_PUBLIC_KEY, targets))
            return true;
        const { user } = context.switchToHttp().getRequest();
        if (!user)
            return true;
        const allowed = roles && roles.length > 0 ? roles : DEFAULT_ROLES;
        if (allowed.includes(user.role))
            return true;
        throw new ForbiddenException('You do not have access to this resource');
    }
};
RolesGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], RolesGuard);
export { RolesGuard };
//# sourceMappingURL=roles.guard.js.map