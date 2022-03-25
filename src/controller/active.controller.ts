import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveService } from 'src/service/active.service';

@ApiTags('ActiveController')
@Controller('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllActive(): Promise<object> {
    return this.activeService.getAllActive();
  }
}
