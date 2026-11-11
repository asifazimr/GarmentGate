import { type PipeTransform } from '@nestjs/common';
import type { z } from 'zod';
export interface ValidationErrorBody {
    statusCode: 400;
    message: 'Validation failed';
    errors: {
        path: string;
        message: string;
    }[];
}
export declare class ZodValidationPipe<S extends z.ZodType> implements PipeTransform<unknown, z.output<S>> {
    private readonly schema;
    constructor(schema: S);
    transform(value: unknown): z.output<S>;
}
