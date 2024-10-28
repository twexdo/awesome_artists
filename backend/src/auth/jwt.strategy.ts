// src/auth/jwt.strategy.ts
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    const logger = new Logger('Bootstrap');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['jwt']; // Adjust this to your cookie name
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'meh', // Use the same key you used to sign the JWT
    });
  }

  async validate(payload: any) {
    const logger = new Logger('Bootstrap');

    return { userId: payload.sub, username: payload.username };
  }
}
