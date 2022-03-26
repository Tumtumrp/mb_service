import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterCreated {
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

  constructor(partial: Partial<RegisterCreated>) {
    Object.assign(this, partial);
  }
}
