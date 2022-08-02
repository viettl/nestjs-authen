import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRolePermission = createParamDecorator(
  (data: any, context: ExecutionContext): any => {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);
    return req.user;
  },
);
