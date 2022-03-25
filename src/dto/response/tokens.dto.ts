import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Tokens {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  constructor(partial: Partial<Tokens>) {
    Object.assign(this, partial);
  }
}
