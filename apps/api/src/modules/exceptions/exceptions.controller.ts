import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type OrderException,
  OrderExceptionSchema,
  type ReplaceFactoryDto,
  ReplaceFactorySchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { CodeSchema } from '../orders/order-params.js';
import { ExceptionsService } from './exceptions.service.js';

/** Staff: orders that need a decision (late, failed final, rejected sample), and fixes. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class ExceptionsController {
  constructor(private readonly exceptions: ExceptionsService) {}

  @Get('exceptions')
  @ApiOkResponse({ standardSchema: z.array(OrderExceptionSchema) })
  list(): Promise<OrderException[]> {
    return this.exceptions.list();
  }

  @Post('orders/:code/replace-factory')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Move an order to another verified factory (exception flow)' })
  replace(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(ReplaceFactorySchema)) dto: ReplaceFactoryDto,
  ): Promise<void> {
    return this.exceptions.replaceFactory(user.id, code, dto);
  }
}
