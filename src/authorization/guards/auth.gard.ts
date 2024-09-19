import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { ROLES_KEY } from "../decorators/roles.decorator";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) { }
    async canActivate(context: ExecutionContext) {
        const ispublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const parsedRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (ispublic) {
            
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);

            if(parsedRoles) {
                const isTrue = parsedRoles.some((role) => role === payload.role);

                if(!isTrue) {
                    throw new Error()
                }
            }
            request.user = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}