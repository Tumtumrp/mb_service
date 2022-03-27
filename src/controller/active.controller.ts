import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiForbiddenBaseResponse } from 'src/common/decorator/api-forbidden-base-response.decorator';
import { ApiUnauthorizedBaseResponse } from 'src/common/decorator/api-unauthorized-base-response.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { ActiveResponse } from 'src/dto/response/active-response.dto';
import { ActiveService } from 'src/service/active.service';

@ApiTags('ActiveController')
@Controller('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'find all active data',
    type: [ActiveResponse],
  })
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('get-actives')
  public async getAllActive(): Promise<ActiveResponse[]> {
    return this.activeService.getAllActive();
  }
}
