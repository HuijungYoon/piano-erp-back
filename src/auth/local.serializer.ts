import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teachers } from '../entities/Teachers';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,
  ) {
    super();
  }

  serializeUser(teacher: Teachers, done: CallableFunction) {
    console.log(teacher);
    done(null, teacher.id);
  }

  async deserializeUser(teacherId: string, done: CallableFunction) {
    return await this.teachersRepository
      .findOneOrFail({
        where: { id: +teacherId },
        select: ['id', 'teacherId', 'name', 'level'],
        relations: ['Students'],
      })
      .then((teacher) => {
        console.log('teacher', teacher);
        done(null, teacher);
      })
      .catch((error) => done(error));
  }
}
