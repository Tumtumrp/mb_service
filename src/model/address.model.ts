import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddressRequest } from 'src/dto/request/address-request.dto';
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

  public async create(
    accountId: number,
    address: AddressRequest,
  ): Promise<AddressEntity> {
    try {
      return await this.addressModel.create({
        accountId: accountId,
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        province: address.province,
        district: address.district,
        zipCode: address.zipCode,
        line: address.line,
        defaultSandAddress: address.defaultSandAddress,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
