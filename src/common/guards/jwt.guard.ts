import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    console.log('JwtGuard', err, user, info);
    if (err || !user) {
      if (info) {
        throw new UnauthorizedException(info);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
