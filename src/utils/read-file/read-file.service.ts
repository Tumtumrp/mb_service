import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class ReadFileService {
  public privateKey(pathKey: string): string {
    const path: string = resolve('./') + pathKey + '.key';
    return readFileSync(path, 'ascii');
  }

  public publicKey(pathKey: string): string {
    const path: string = resolve('./') + pathKey + '.key.pub';
    return readFileSync(path, 'ascii');
  }
}
