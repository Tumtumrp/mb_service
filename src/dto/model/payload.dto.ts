import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Payload {
  @IsNotEmpty()
  @IsNumber()
  _id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  constructor(partial: Partial<Payload>) {
    Object.assign(this, partial);
  }
}
