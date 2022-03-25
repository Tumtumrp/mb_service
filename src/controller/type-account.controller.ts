import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TypeAccountResponse } from 'src/dto/response/type-account-response.dto';
import { TypeAccountService } from 'src/service/type-account.service';

@ApiTags('TypeAccountController')
@Controller('type-account')
export class TypeAccountController {
  constructor(private readonly typeAccountService: TypeAccountService) {}

  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'find all type account data',
    type: [TypeAccountResponse],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllTypeAccount(): Promise<TypeAccountResponse[]> {
    return await this.typeAccountService.getAllTypeAccount();
  }
}
