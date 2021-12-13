import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard_renewal implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getNext()['req'];
        if (!req.user) throw new UnauthorizedException('권한이 없습니다');
        return true;
    }
}
