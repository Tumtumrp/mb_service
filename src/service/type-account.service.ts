import { Injectable } from '@nestjs/common';
import { TypeAccountModel } from 'src/model/typ-account.model';

@Injectable()
export class TypeAccountService {
  constructor(private readonly typeAccountModel: TypeAccountModel) {}

  public async getAllTypeAccount(): Promise<object> {
    return await this.typeAccountModel.findAll();
  }
}
