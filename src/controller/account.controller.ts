import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiForbiddenBaseResponse } from 'src/common/decorator/api-forbidden-base-response.decorator';
import { ApiUnauthorizedBaseResponse } from 'src/common/decorator/api-unauthorized-base-response.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
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
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('get-accounts')
  public async getAllAccount(): Promise<AccountResponse[]> {
    return await this.accountService.getAllAccount();
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'search all account by username',
    type: [AccountResponse],
  })
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('search/email/:email')
  public async searchAccountByEmail(
    @Param('email') email: string,
  ): Promise<AccountResponse[]> {
    return await this.accountService.searchByEmail(email);
  }
}
