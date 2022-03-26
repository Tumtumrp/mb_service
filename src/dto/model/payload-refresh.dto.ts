import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';
import { Payload } from './payload.dto';

export class PayloadRefresh {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmptyObject()
  @IsObject()
  payload: Payload;

  constructor(partial: Partial<PayloadRefresh>) {
    Object.assign(this, partial);
  }
}
