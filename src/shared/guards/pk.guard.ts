import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PkGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    const token = authorization ? authorization.split('Bearer ')[1] : null;
    if (token && token.startsWith('pk_test_')) {
      const formatToken = token.split('_');
      if (
        formatToken[0] === 'pk' &&
        formatToken[1] === 'test' &&
        formatToken[2]
      ) {
        request.headers['pk'] = token;
        return true;
      }
    }
    throw new UnauthorizedException('Token inválido');
  }
}
