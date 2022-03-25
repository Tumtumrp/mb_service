import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  public async isPassword(password: string): Promise<RegExpExecArray> {
    return new Promise((resolve) => {
      const regex =
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*--+=?\_]).{8,16}$/;
      return resolve(regex.exec(password));
    });
  }
}
