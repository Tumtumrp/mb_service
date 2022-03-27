import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { DefaultSandAddress } from 'src/common/enum/default-sand-address.enum';

export class AddressResponse {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  addressId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsPhoneNumber('TH')
  phoneNumber: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  zipCode: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  line: string;

  @ApiProperty({ enum: DefaultSandAddress, default: 'HOME' })
  @IsNotEmpty()
  @IsEnum(DefaultSandAddress)
  defaultSandAddress: DefaultSandAddress;

  constructor(partial: Partial<AddressResponse>) {
    Object.assign(this, partial);
  }
}
