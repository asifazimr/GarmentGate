import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type { z } from 'zod';

export interface ValidationErrorBody {
  statusCode: 400;
  message: 'Validation failed';
  errors: { path: string; message: string }[];
}

/**
 * Parses a request body/query/param with a shared Zod schema and returns the parsed output.
 * Usage: `@Body(new ZodValidationPipe(RegisterSchema)) dto: RegisterDto`
 */
export class ZodValidationPipe<S extends z.ZodType> implements PipeTransform<unknown, z.output<S>> {
  constructor(private readonly schema: S) {}

  transform(value: unknown): z.output<S> {
    const result = this.schema.safeParse(value);
    if (result.success) return result.data;

    const body: ValidationErrorBody = {
      statusCode: 400,
      message: 'Validation failed',
      errors: result.error.issues.map((issue) => ({
        path: issue.path.map(String).join('.'),
        message: issue.message,
      })),
    };
    throw new BadRequestException(body);
  }
}
