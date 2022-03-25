import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { Payload } from 'src/dto/model/payload.dto';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<Payload> {
    const payload: Payload = await this.authService.valid(username, password);
    if (!payload)
      throw new UnauthorizedException('wrong username or password!');

    return payload;
  }
}
