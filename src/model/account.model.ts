import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountEntity } from 'src/entities/account.entity';
import { TypeAccountEntity } from 'src/entities/type-account.entity';

@Injectable()
export class AccountModel {
  constructor(
    @InjectModel(AccountEntity) private accountModel: typeof AccountEntity,
  ) {}

  public async findByUsername(username: string): Promise<AccountEntity> {
    try {
      return await this.accountModel.findOne({
        where: { username },
        include: { model: TypeAccountEntity },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
