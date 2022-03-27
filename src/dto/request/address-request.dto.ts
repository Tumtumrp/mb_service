import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { DefaultSandAddress } from 'src/common/enum/default-sand-address.enum';

export class AddressRequest {
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

  constructor(partial: Partial<AddressRequest>) {
    Object.assign(this, partial);
  }
}
