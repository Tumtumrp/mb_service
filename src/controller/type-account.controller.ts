import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeAccountService } from 'src/service/type-account.service';

@ApiTags('TypeAccountController')
@Controller('type-account')
export class TypeAccountController {
  constructor(private readonly typeAccountService: TypeAccountService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllTypeAccount(): Promise<object> {
    return await this.typeAccountService.getAllTypeAccount();
  }
}
