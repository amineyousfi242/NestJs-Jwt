import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtSrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extract token from headers
      secretOrKey: 'at-secret', // with which we're going to sing the token
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
