import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let can;
    try {
      can = await super.canActivate(context);
    } catch (error) {
      console.log(error);
    }
    console.log(can);

    if (can) {
      const request = context.switchToHttp().getRequest();
      console.log('login for cookie');
      console.log('request.user:', request.user); // 추가 로그
      await super.logIn(request);
    }

    return true;
  }
}
