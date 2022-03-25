import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const RequestUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
