import { Injectable } from '@nestjs/common';
import { ActiveModel } from 'src/model/active.model';

@Injectable()
export class ActiveService {
  constructor(private readonly activeModel: ActiveModel) {}

  public async getAllActive(): Promise<object> {
    return await this.activeModel.findAll();
  }
}
