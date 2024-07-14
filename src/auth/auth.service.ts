import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Teachers } from '../entities/Teachers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,
  ) {}

  async validateTeacher(teacherId: string, password: string) {
    const teacher = await this.teachersRepository.findOne({
      where: { teacherId },
      select: ['id', 'teacherId', 'password', 'name', 'level'],
    });
    if (!teacher) {
      return null;
    }
    const result = await bcrypt.compare(password, teacher.password);
    if (result) {
      const { password, ...teacherWithoutPassword } = teacher;
      return teacherWithoutPassword;
    }
    return null;
  }
}
