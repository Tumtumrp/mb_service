import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RegisterRequest } from 'src/dto/request/register-request.dto';
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

  public async findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<number> {
    try {
      return await this.accountModel.count({
        where: { [Op.or]: [{ username }, { email }] },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async create(account: RegisterRequest): Promise<AccountEntity> {
    try {
      return await this.accountModel.create({
        username: account.username,
        email: account.email,
        password: account.password,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
