import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Payload {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  _id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  role: string;

  constructor(partial: Partial<Payload>) {
    Object.assign(this, partial);
  }
}
