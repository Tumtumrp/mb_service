import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiUnauthorizedBaseResponse } from 'src/common/decorator/api-unauthorized-base-response.decorator';
import { RequestUser } from 'src/common/decorator/request-user.decorator';
import { AddressResponse } from 'src/dto/response/address-response.dto';
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
  @Get()
  public async getAddressesByAccountId(
    @RequestUser('_id') accountId: number,
  ): Promise<AddressResponse[]> {
    return await this.addressService.getAddressesByAccountId(accountId);
  }
}
