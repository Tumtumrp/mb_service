import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class BaseCreatedResponse<T> {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  data: T;

  constructor(partial: Partial<BaseCreatedResponse<T>>) {
    Object.assign(this, partial);
  }
}
