import { UserEntity } from '@/entities/users';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetProfile = createParamDecorator(
  (data: any, context: ExecutionContext): UserEntity => {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);
    console.log('paramas');

    return req.user.user;
  },
);
