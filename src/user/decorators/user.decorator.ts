import { IExpressRequestInterface } from '@app/types/expressExpress.interface';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<IExpressRequestInterface>();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
