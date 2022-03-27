import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiForbiddenBaseResponse } from 'src/common/decorator/api-forbidden-base-response.decorator';
import { ApiUnauthorizedBaseResponse } from 'src/common/decorator/api-unauthorized-base-response.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
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
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('get-types-account')
  public async getAllTypeAccount(): Promise<TypeAccountResponse[]> {
    return await this.typeAccountService.getAllTypeAccount();
  }
}
