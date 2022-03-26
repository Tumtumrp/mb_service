import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LogoutResponse {
  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  message: string;

  constructor(partial: Partial<LogoutResponse>) {
    Object.assign(this, partial);
  }
}
