import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private saltRound = 12;

  public async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRound);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
