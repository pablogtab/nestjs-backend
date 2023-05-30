//Decorator that returns the user object from the request object

import { createParamDecorator, ExecutionContext, HttpException } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { UserGuardDto } from "src/modules/users/dto/userGuard.dto";

export const UserParam = createParamDecorator((data: unknown, ctx: ExecutionContext): UserGuardDto => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new HttpException('Internal server error', 500)
    const { idUser, email, role } = request.user
    return {
        idUser,
        email,
        role
    }

})