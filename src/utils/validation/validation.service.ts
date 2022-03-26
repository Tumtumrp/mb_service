import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  public async isPassword(password: string): Promise<boolean> {
    return new Promise((resolve) => {
      const regex =
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*--+=?\_]).{8,16}$/;
      return resolve(regex.test(password));
    });
  }
}
