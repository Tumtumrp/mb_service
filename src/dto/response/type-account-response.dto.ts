import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TypeAccountResponse {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  typeAccountId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  typeAccountName: string;

  constructor(partial: Partial<TypeAccountResponse>) {
    Object.assign(this, partial);
  }
}
