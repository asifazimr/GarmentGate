import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AdminContract,
  AdminContractSchema,
  type BuyerContract,
  BuyerContractSchema,
  type CallOffDto,
  CallOffSchema,
  type CreateContractDto,
  CreateContractSchema,
  type ManufacturerContract,
  ManufacturerContractSchema,
  type Merchandiser,
  MerchandiserSchema,
  AdminMerchandiserSchema,
  type SetMerchandiserDto,
  SetMerchandiserSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { ContractsService } from './contracts.service.js';

const ContractCode = new ZodValidationPipe(z.string().regex(/^CTR-\d{4}-\d{5,}$/));
const BuyerCode = new ZodValidationPipe(z.string().regex(/^BYR-[A-Z]{2}-\d{4}$/));

/** Buyers and factories: their supply contracts; buyers call off orders against them. */
@ApiTags('contracts')
@ApiCookieAuth()
@Controller()
export class ContractsController {
  constructor(
    private readonly contracts: ContractsService,
    private readonly actors: ChatActorService,
  ) {}

  @Get('contracts')
  @Roles('BUYER')
  @ApiOkResponse({ standardSchema: z.array(BuyerContractSchema) })
  async buyerList(@CurrentUser() user: AuthenticatedUser): Promise<BuyerContract[]> {
    return this.contracts.buyerList(await this.actors.resolve(user.id));
  }

  @Post('contracts/:code/call-offs')
  @Roles('BUYER')
  @ApiOperation({ summary: 'Call off an order against a supply contract (deposit due)' })
  async callOff(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', ContractCode) code: string,
    @Body(new ZodValidationPipe(CallOffSchema)) dto: CallOffDto,
  ): Promise<{ orderCode: string }> {
    return this.contracts.callOff(await this.actors.resolve(user.id), code, dto);
  }

  @Get('buyer/merchandiser')
  @Roles('BUYER')
  @ApiOkResponse({ standardSchema: MerchandiserSchema.nullable() })
  async merchandiser(@CurrentUser() user: AuthenticatedUser): Promise<Merchandiser | null> {
    return this.contracts.buyerMerchandiser(await this.actors.resolve(user.id));
  }

  @Get('manufacturer/contracts')
  @Roles('MANUFACTURER')
  @ApiOkResponse({ standardSchema: z.array(ManufacturerContractSchema) })
  async factoryList(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerContract[]> {
    return this.contracts.factoryList(await this.actors.resolve(user.id));
  }
}

/** Staff: supply contracts and account merchandisers. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class AdminContractsController {
  constructor(private readonly contracts: ContractsService) {}

  @Get('contracts')
  @ApiOkResponse({ standardSchema: z.array(AdminContractSchema) })
  list(): Promise<AdminContract[]> {
    return this.contracts.adminList();
  }

  @Post('contracts')
  @ApiOperation({ summary: 'Agree a supply contract (frame agreement) with a buyer and a factory' })
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateContractSchema)) dto: CreateContractDto,
  ): Promise<{ code: string }> {
    return this.contracts.create(user.id, dto);
  }

  @Post('contracts/:code/end')
  @HttpCode(HttpStatus.NO_CONTENT)
  end(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', ContractCode) code: string,
  ): Promise<void> {
    return this.contracts.end(user.id, code, 'ENDED');
  }

  @Get('buyers/:code/merchandiser')
  @ApiOkResponse({ standardSchema: AdminMerchandiserSchema.nullable() })
  merchandiser(
    @Param('code', BuyerCode) code: string,
  ): Promise<{ userId: string; name: string } | null> {
    return this.contracts.accountMerchandiser(code);
  }

  @Put('buyers/:code/merchandiser')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Assign (or clear) the GarmentGate merchandiser for a buyer account' })
  setMerchandiser(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', BuyerCode) code: string,
    @Body(new ZodValidationPipe(SetMerchandiserSchema)) dto: SetMerchandiserDto,
  ): Promise<void> {
    return this.contracts.setMerchandiser(user.id, code, dto.userId);
  }
}
