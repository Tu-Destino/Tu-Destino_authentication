import {
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
  import { Logger } from '@nestjs/common';
import { UserRole } from 'src/modules/users/entities/user.entity';
import { ROLES_KEY } from 'src/libs/decorators/roles.decorator';
  
  
  @Injectable()
  export class AtGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(AtGuard.name);
  
    constructor(private reflector: Reflector) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
   
      const canActivate = (await super.canActivate(context)) as boolean;
      if (!canActivate) return false;
      const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!roles || roles.length === 0) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        this.logger.warn('Access Denied: Unauthorized access attempt');
        throw new UnauthorizedException('Access Denied.');
      }
  
      const hasRole = roles.some(role => user.role === role);
      if (!hasRole) {
        this.logger.warn(`Access Denied: User lacks required roles: ${roles}`);
        throw new UnauthorizedException('Access Denied.');
      }
  
      return true;
    }
  
    handleRequest(err, user, info: Error) {
      if (err || info) {
        this.logger.error(`JWT error: ${info?.message || err}`);
        throw new HttpException('Token is expired!', HttpStatus.UNAUTHORIZED);
      }
  
      if (!user) {
        this.logger.warn('Access Denied: Unauthorized access attempt');
        throw new UnauthorizedException('Access Denied.');
      }
  
      return user;
    }
  }
  