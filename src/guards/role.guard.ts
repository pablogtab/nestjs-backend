import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { User } from 'src/modules/users/user.entity';
import { UserRole } from 'src/modules/users/userRole';


@Injectable()
export class RoleGuard implements CanActivate {


    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());

        if (!roles) { return true }

        const request = context.switchToHttp().getRequest();
        const user = request.user as User

        if(roles.some((role) => role === user.role)) return true

        return false
    }
}