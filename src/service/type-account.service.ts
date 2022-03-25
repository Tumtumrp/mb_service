import { Injectable } from '@nestjs/common';
import { TypeAccountResponse } from 'src/dto/response/type-account-response.dto';
import { TypeAccountEntity } from 'src/entities/type-account.entity';
import { TypeAccountModel } from 'src/model/typ-account.model';

@Injectable()
export class TypeAccountService {
  constructor(private readonly typeAccountModel: TypeAccountModel) {}

  public async getAllTypeAccount(): Promise<TypeAccountResponse[]> {
    const types: TypeAccountEntity[] = await this.typeAccountModel.findAll();

    return types.map((type) => {
      return new TypeAccountResponse({
        typeAccountId: type.typeAccountId,
        typeAccountName: type.typeAccountName,
      });
    });
  }
}
