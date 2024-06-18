import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from 'src/entities/Teachers';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,
  ) {}
  async create(
    teacherId: string,
    password: string,
    name: string,
    tel: string,
    level: 'admin' | 'teacher' | 'assistant',
  ) {
    const teacher = await this.teachersRepository.findOne({
      where: { teacherId },
    });
    if (teacher) {
      throw new UnauthorizedException('이미 존재하는 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    await this.teachersRepository.save({
      teacherId,
      password: hashedPassword,
      name,
      tel,
      level,
    });
  }

  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
