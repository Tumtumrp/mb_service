import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActiveResponse {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  activeId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  activeName: string;

  constructor(partial: Partial<ActiveResponse>) {
    Object.assign(this, partial);
  }
}
