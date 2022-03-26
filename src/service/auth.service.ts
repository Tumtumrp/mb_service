import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/dto/model/payload.dto';
import { RegisterCreated } from 'src/dto/model/register-created.dto';
import { RegisterRequest } from 'src/dto/request/register-request.dto';
import { BaseCreatedResponse } from 'src/dto/response/base-created-response.dto';
import { LogoutResponse } from 'src/dto/response/logout-response.dto';
import { Tokens } from 'src/dto/response/tokens.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';
import { RefreshTokenModel } from 'src/model/refresh-token.model';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { ReadFileService } from 'src/utils/read-file/read-file.service';
import { ValidationService } from 'src/utils/validation/validation.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountModel: AccountModel,
    private readonly refreshTokenModel: RefreshTokenModel,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly readFileService: ReadFileService,
    private readonly validationService: ValidationService,
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

  public async login(user: Payload): Promise<Tokens> {
    try {
      const tokens = await this.getToken(user);
      await this.updateRefreshToken(user._id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async logout(accountId: number): Promise<LogoutResponse> {
    const refreshToken: boolean =
      await this.refreshTokenModel.updateByAccountId(accountId, null);
    if (!refreshToken) throw new InternalServerErrorException();

    return new LogoutResponse({
      status: refreshToken,
      message: 'logout your account successfully',
    });
  }

  public async register(
    request: RegisterRequest,
  ): Promise<BaseCreatedResponse<RegisterCreated>> {
    const isMatchAccount: number =
      await this.accountModel.findByUsernameOrEmail(
        request.username,
        request.email,
      );
    if (isMatchAccount !== 0)
      throw new BadRequestException('Username or email already has a user.');

    const isPassword: boolean = await this.validationService.isPassword(
      request.password,
    );
    if (!isPassword)
      throw new BadRequestException(
        'Password must have at least one Uppercase character, least one lowercase character, least one digit, least one special symbol [~`!@#$%^&*-+=?_] and be 8-16 characters long.',
      );

    const hashPassword: string = await this.bcryptService.hash(
      request.password,
    );
    request.password = hashPassword;

    const account: AccountEntity = await this.accountModel.create(request);
    await this.refreshTokenModel.create(account.accountId);

    return new BaseCreatedResponse<RegisterCreated>({
      message: 'create new account successfully',
      data: new RegisterCreated({
        accountId: account.accountId,
        username: account.username,
        email: account.email,
      }),
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
            privateKey: this.readFileService.privateKey('\\src\\assets\\auth'),
            algorithm: 'RS256',
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          { _id: data._id, username: data.username, role: data.role },
          {
            privateKey: this.readFileService.privateKey('\\src\\assets\\auth'),
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
