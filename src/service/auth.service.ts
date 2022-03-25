import { Injectable } from '@nestjs/common';
import { Payload } from 'src/dto/model/payload.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountModel: AccountModel,
    private readonly bcryptService: BcryptService,
  ) {}

  public async valid(username: string, password: string): Promise<any> {
    const account: AccountEntity = await this.accountModel.findByUsername(
      username,
    );
    if (!account) return null;

    const isMatch: boolean = await this.bcryptService.compare(
      password,
      account.password,
    );
    if (!isMatch) return null;

    return new Payload({
      _id: account.accountId,
      username: account.username,
      role: account.typeAccount.typeAccountName,
    });
  }
}
