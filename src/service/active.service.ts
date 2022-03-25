import { Injectable } from '@nestjs/common';
import { ActiveResponse } from 'src/dto/response/active-response.dto';
import { ActiveEntity } from 'src/entities/Active.entity';
import { ActiveModel } from 'src/model/active.model';

@Injectable()
export class ActiveService {
  constructor(private readonly activeModel: ActiveModel) {}

  public async getAllActive(): Promise<ActiveResponse[]> {
    const actives: ActiveEntity[] = await this.activeModel.findAll();

    return actives.map((active) => {
      return new ActiveResponse({
        activeId: active.activeId,
        activeName: active.activeName,
      });
    });
  }
}
