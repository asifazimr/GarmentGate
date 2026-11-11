import { BadRequestException } from '@nestjs/common';
export class ZodValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        const result = this.schema.safeParse(value);
        if (result.success)
            return result.data;
        const body = {
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
//# sourceMappingURL=zod-validation.pipe.js.map