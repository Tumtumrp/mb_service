import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddressEntity } from 'src/entities/address.entity';

@Injectable()
export class AddressModel {
  constructor(
    @InjectModel(AddressEntity) private addressModel: typeof AddressEntity,
  ) {}

  public async findByAccountId(accountId: number): Promise<AddressEntity[]> {
    try {
      return await this.addressModel.findAll({
        where: { account_id: accountId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
