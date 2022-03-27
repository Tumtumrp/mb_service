import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiOkBaseCreatedResponse } from 'src/common/decorator/api-ok-base-created-response.decorator';
import { ApiUnauthorizedBaseResponse } from 'src/common/decorator/api-unauthorized-base-response.decorator';
import { RequestUser } from 'src/common/decorator/request-user.decorator';
import { AddressRequest } from 'src/dto/request/address-request.dto';
import { AddressResponse } from 'src/dto/response/address-response.dto';
import { BaseCreatedResponse } from 'src/dto/response/base-created-response.dto';
import { AddressService } from 'src/service/address.service';

@ApiTags('AddressController')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'find all address by account id successfully',
    type: [AddressResponse],
  })
  @ApiUnauthorizedBaseResponse()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get-address')
  public async getAddressesByAccountId(
    @RequestUser('_id') accountId: number,
  ): Promise<AddressResponse[]> {
    return await this.addressService.getAddressesByAccountId(accountId);
  }

  @ApiBearerAuth()
  @ApiOkBaseCreatedResponse(AddressResponse, 'create new address successfully')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create-new-address')
  public async createNewAddress(
    @RequestUser('_id') accountId: number,
    request: AddressRequest,
  ): Promise<BaseCreatedResponse<AddressResponse>> {
    return await this.addressService.createNewAddress(accountId, request);
  }
}
