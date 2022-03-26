import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadRefresh } from 'src/dto/model/payload-refresh.dto';
import { Payload } from 'src/dto/model/payload.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';
import { ReadFileService } from 'src/utils/read-file/read-file.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    readonly readFileService: ReadFileService,
    private accountModel: AccountModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: readFileService.publicKey('\\src\\assets\\key\\refresh'),
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: Payload,
  ): Promise<PayloadRefresh> {
    const account: AccountEntity = await this.accountModel.findByPK(
      payload._id,
    );
    if (!account) throw new UnauthorizedException();

    const refreshToken: string = request
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    return new PayloadRefresh({ refreshToken, payload });
  }
}
