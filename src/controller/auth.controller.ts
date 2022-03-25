import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/service/auth.service';
import { RequestUser } from 'src/common/decorator/request-user.decorator';
import { Payload } from 'src/dto/model/payload.dto';
import { BasicAuthGuard } from 'src/auth/guard/basic-auth.guard';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('login')
  public async login(@RequestUser() user: Payload): Promise<object> {
    return user;
  }
}
