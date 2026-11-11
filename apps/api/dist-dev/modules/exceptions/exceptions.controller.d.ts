import { type OrderException, type ReplaceFactoryDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ExceptionsService } from './exceptions.service.js';
export declare class ExceptionsController {
    private readonly exceptions;
    constructor(exceptions: ExceptionsService);
    list(): Promise<OrderException[]>;
    replace(user: AuthenticatedUser, code: string, dto: ReplaceFactoryDto): Promise<void>;
}
