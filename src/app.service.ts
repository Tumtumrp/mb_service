import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      Application: 'Mobile Shopping Online',
      fullName: 'Ratchapol Thongta',
    };
  }
}
