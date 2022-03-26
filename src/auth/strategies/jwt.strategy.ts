import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/dto/model/payload.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';
import { ReadFileService } from 'src/utils/read-file/read-file.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly readFileService: ReadFileService,
    private readonly accountModel: AccountModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: readFileService.publicKey('\\src\\assets\\key\\auth'),
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: Payload): Promise<Payload> {
    const account: AccountEntity = await this.accountModel.findByPK(
      payload._id,
    );
    if (!account) throw new UnauthorizedException();

    return payload;
  }
}
