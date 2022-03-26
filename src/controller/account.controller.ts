import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
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

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'search all account by username',
    type: [AccountResponse],
  })
  @HttpCode(HttpStatus.OK)
  @Get('search/username/:username')
  public async searchAccountByUsername(
    @Param('username') username: string,
  ): Promise<AccountResponse[]> {
    return await this.accountService.searchByUsername(username);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'search all account by email',
    type: [AccountResponse],
  })
  @HttpCode(HttpStatus.OK)
  @Get('search/email/:email')
  public async searchAccountByEmail(
    @Param('email') email: string,
  ): Promise<AccountResponse[]> {
    return await this.accountService.searchByEmail(email);
  }
}
