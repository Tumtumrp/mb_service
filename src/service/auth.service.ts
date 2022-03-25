import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/dto/model/payload.dto';
import { Tokens } from 'src/dto/response/tokens.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';
import { RefreshTokenModel } from 'src/model/refresh-token.model';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountModel: AccountModel,
    private readonly refreshTokenModel: RefreshTokenModel,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  public async valid(username: string, password: string): Promise<Payload> {
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

  private async updateRefreshToken(
    accountId: number,
    refreshToken: string,
  ): Promise<void> {
    const arrayToken: string[] = refreshToken.split('.');
    const refreshTokenHash: string = await this.bcryptService.hash(
      arrayToken[2],
    );

    await this.refreshTokenModel.updateByAccountId(accountId, refreshTokenHash);
  }

  private async getToken(data: Payload): Promise<Tokens> {
    try {
      const [accessToken, refreshToken]: string[] = await Promise.all([
        this.jwtService.signAsync(
          { _id: data._id, username: data.username, role: data.role },
          {
            privateKey: '',
            algorithm: 'RS256',
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          { _id: data._id, username: data.username, role: data.role },
          {
            privateKey: '',
            algorithm: 'RS256',
            expiresIn: '7d',
          },
        ),
      ]);

      return new Tokens({ accessToken, refreshToken });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
