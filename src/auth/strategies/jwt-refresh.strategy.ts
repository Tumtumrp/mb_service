import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ReadFileService } from 'src/utils/read-file/read-file.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(readonly readFileService: ReadFileService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: readFileService.publicKey('\\src\\assets\\key\\refresh'),
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }
}
