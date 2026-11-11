import { type OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env.schema.js';
import { PrismaClient } from '../generated/prisma/client.js';
export declare class PrismaService extends PrismaClient implements OnModuleDestroy {
    constructor(config: ConfigService<Env, true>);
    onModuleDestroy(): Promise<void>;
}
