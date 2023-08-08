import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);
  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.debug('Validating token');
    const token = this.extractTokenFromHeader(request);
    this.logger.debug(`Token extracted: ${token}`);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      this.logger.debug(`Jwt is valid`);
      request['user'] = payload;
    } catch(e) {
      this.logger.error(e.message, e.stack);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
