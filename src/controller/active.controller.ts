import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ActiveResponse } from 'src/dto/response/active-response.dto';
import { ActiveService } from 'src/service/active.service';

@ApiTags('ActiveController')
@Controller('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'find all active data',
    type: [ActiveResponse],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllActive(): Promise<ActiveResponse[]> {
    return this.activeService.getAllActive();
  }
}
