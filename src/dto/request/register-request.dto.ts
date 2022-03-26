import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail(null, { message: '' })
  email: string;

  @ApiProperty({
    type: String,
    description:
      'Password must have at least one Uppercase character, least one lowercase character, least one digit, least one special symbol [~`!@#$%^&*-+=?_] and be 8-16 characters long.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(partial: Partial<RegisterRequest>) {
    Object.assign(this, partial);
  }
}
