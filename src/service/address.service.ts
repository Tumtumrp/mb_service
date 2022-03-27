import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddressRequest } from 'src/dto/request/address-request.dto';
import { AddressResponse } from 'src/dto/response/address-response.dto';
import { BaseCreatedResponse } from 'src/dto/response/base-created-response.dto';
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

  public async createNewAddress(
    accountId: number,
    request: AddressRequest,
  ): Promise<BaseCreatedResponse<AddressResponse>> {
    const address: AddressEntity = await this.addressModel.create(
      accountId,
      request,
    );
    if (!address) throw new InternalServerErrorException();

    return new BaseCreatedResponse<AddressResponse>({
      message: 'create new address successfully',
      data: new AddressResponse({
        addressId: address.addressId,
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        province: address.province,
        district: address.district,
        zipCode: address.zipCode,
        line: address.line,
        defaultSandAddress: address.defaultSandAddress,
      }),
    });
  }
}
