//Decorator that returns the user object from the request object

import { createParamDecorator, ExecutionContext, HttpException } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export const UserParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new HttpException('Internal server error', 500)
    return request.user

})