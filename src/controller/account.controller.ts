import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountResponse } from 'src/dto/response/account-response.dto';
import { AccountService } from 'src/service/account.service';

@ApiTags('AccountController')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'find all account user',
    type: [AccountResponse],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllAccount(): Promise<AccountResponse[]> {
    return await this.accountService.getAllAccount();
  }
}
