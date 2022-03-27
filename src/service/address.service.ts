import { Injectable } from '@nestjs/common';
import { AddressResponse } from 'src/dto/response/address-response.dto';
import { AddressEntity } from 'src/entities/address.entity';
import { AddressModel } from 'src/model/address.model';

@Injectable()
export class AddressService {
  constructor(private readonly addressModel: AddressModel) {}

  public async getAddressesByAccountId(
    accountId: number,
  ): Promise<AddressResponse[]> {
    const addresses: AddressEntity[] = await this.addressModel.findByAccountId(
      accountId,
    );

    return addresses.map((address) => {
      return new AddressResponse({
        addressId: address.addressId,
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        province: address.province,
        district: address.district,
        zipCode: address.zipCode,
        line: address.line,
        defaultSandAddress: address.defaultSandAddress,
      });
    });
  }
}
