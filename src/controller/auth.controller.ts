import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/service/auth.service';
import { RequestUser } from 'src/common/decorator/request-user.decorator';
import { Payload } from 'src/dto/model/payload.dto';
import { BasicAuthGuard } from 'src/auth/guard/basic-auth.guard';
import { Tokens } from 'src/dto/response/tokens.dto';
import { RegisterRequest } from 'src/dto/request/register-request.dto';
import { BaseCreatedResponse } from 'src/dto/response/base-created-response.dto';
import { RegisterCreated } from 'src/dto/model/register-created.dto';
import { ApiOkBaseCreatedResponse } from 'src/common/decorator/api-ok-base-created-response.decorator';
import { ApiBadResponse } from 'src/common/decorator/api-bad-response.decorator';
import { LogoutResponse } from 'src/dto/response/logout-response.dto';
import { PayloadRefresh } from 'src/dto/model/payload-refresh.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRefreshAuthGuard } from 'src/auth/guard/jwt-refresh.guard';
import { ApiUnauthorizedBaseResponse } from 'src/common/decorator/api-unauthorized-base-response.decorator';

@ApiTags('AuthController')
@ApiExtraModels(BaseCreatedResponse, RegisterCreated)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'login account successfully',
    type: Tokens,
  })
  @ApiUnauthorizedBaseResponse()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('login')
  public async login(@RequestUser() user: Payload): Promise<Tokens> {
    return await this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'logout your account successfully',
    type: LogoutResponse,
  })
  @ApiUnauthorizedBaseResponse()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  public async logout(
    @RequestUser('_id') accountId: number,
  ): Promise<LogoutResponse> {
    return await this.authService.logout(accountId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'login account successfully',
    type: Tokens,
  })
  @ApiUnauthorizedBaseResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh-token')
  public async refreshToken(
    @RequestUser() user: PayloadRefresh,
  ): Promise<Tokens> {
    return await this.authService.refreshToken(
      user.payload._id,
      user.refreshToken,
    );
  }

  @ApiOkBaseCreatedResponse(RegisterCreated, 'create new account successfully')
  @ApiBadResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(
    @Body() request: RegisterRequest,
  ): Promise<BaseCreatedResponse<RegisterCreated>> {
    return await this.authService.register(request);
  }
}
