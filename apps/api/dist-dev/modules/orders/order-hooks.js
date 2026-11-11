var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let OrderHooks = class OrderHooks {
    hooks = [];
    register(hook) {
        this.hooks.push(hook);
    }
    async before(order, to, who) {
        for (const h of this.hooks)
            await h.before?.(order, to, who);
    }
    async within(tx, order, to) {
        for (const h of this.hooks)
            await h.within?.(tx, order, to);
    }
    async after(order, to) {
        for (const h of this.hooks)
            await h.after?.(order, to);
    }
};
OrderHooks = __decorate([
    Injectable()
], OrderHooks);
export { OrderHooks };
//# sourceMappingURL=order-hooks.js.map