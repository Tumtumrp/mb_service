import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccountResponse {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  activeId: number;

  constructor(partial: Partial<AccountResponse>) {
    Object.assign(this, partial);
  }
}
