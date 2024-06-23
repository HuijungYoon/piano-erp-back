import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'teacherId', passwordField: 'password' });
  }

  async validate(teacherId: string, password: string): Promise<any> {
    const teacher = await this.authService.validateTeacher(teacherId, password);
    if (!teacher) {
      throw new UnauthorizedException();
    }

    return teacher;
  }
}
