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
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('login')
  public async login(@RequestUser() user: Payload): Promise<Tokens> {
    return await this.authService.login(user);
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
