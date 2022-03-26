import { Injectable } from '@nestjs/common';
import { AccountResponse } from 'src/dto/response/account-response.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';

@Injectable()
export class AccountService {
  constructor(private readonly accountModel: AccountModel) {}

  public async getAllAccount(): Promise<AccountResponse[]> {
    const accounts: AccountEntity[] = await this.accountModel.findAll();

    return accounts.map((account) => {
      return new AccountResponse({
        accountId: account.accountId,
        username: account.username,
        email: account.email,
        role: account.typeAccount.typeAccountName,
        activeId: account.activeId,
      });
    });
  }

  public async searchByUsername(username: string): Promise<AccountResponse[]> {
    const accounts: AccountEntity[] =
      await this.accountModel.findAllByUsernameLike(username);

    return accounts.map((account) => {
      return new AccountResponse({
        accountId: account.accountId,
        username: account.username,
        email: account.email,
        role: account.typeAccount.typeAccountName,
        activeId: account.activeId,
      });
    });
  }

  public async searchByEmail(email: string): Promise<AccountResponse[]> {
    const accounts: AccountEntity[] =
      await this.accountModel.findAllByEmailLike(email);

    return accounts.map((account) => {
      return new AccountResponse({
        accountId: account.accountId,
        username: account.username,
        email: account.email,
        role: account.typeAccount.typeAccountName,
        activeId: account.activeId,
      });
    });
  }
}
