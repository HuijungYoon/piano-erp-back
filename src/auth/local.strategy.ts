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
    console.log('LocalStrategy validate - teacherId:', teacherId); // 로그 추가
    console.log('LocalStrategy validate - password:', password); // 로그 추가
    const teacher = await this.authService.validateTeacher(teacherId, password);
    console.log('LocalStrategy validate - result:', teacher); // 로그 추가
    if (!teacher) {
      console.log('LocalStrategy validate - UnauthorizedException'); // 로그 추가
      throw new UnauthorizedException();
    }
    return teacher;
  }
}
