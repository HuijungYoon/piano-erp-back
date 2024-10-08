import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from 'src/entities/Teachers';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Lessons } from 'src/entities/Lessons';
@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,
    @InjectRepository(Lessons)
    private lessonsRepository: Repository<Lessons>,
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

    const teacherName = await this.teachersRepository.findOne({
      where: { name },
    });

    if (teacher) {
      throw new UnauthorizedException('이미 존재하는 아이디입니다.');
    }
    if (teacherName) {
      throw new UnauthorizedException('이미 존재하는 이름입니다.');
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

  async findAll(teacher: Teachers) {
    if (!teacher) {
      throw new BadRequestException('사용자 정보가 없습니다.');
    }

    if (teacher.level === 'admin') {
      return await this.teachersRepository.find({
        relations: ['students'],
      });
    }

    if (teacher.level === 'teacher') {
      const teacherData = await this.teachersRepository.findOne({
        where: { id: teacher.id },
        relations: ['students'],
      });
      return teacherData ? [teacherData] : [];
    }

    // const teachers = await this.teachersRepository.find({
    //   relations: ['students'],
    // });
    // return teachers;
  }

  async findOne(id: number) {
    const teacher = await this.teachersRepository.findOne({
      where: { id },
      select: ['id', 'teacherId', 'name', 'tel', 'level'],
    });

    if (!teacher) {
      throw new BadRequestException('존재하지 않는 아이디입니다.');
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teachersRepository.findOne({
      where: { id },
      select: ['id', 'teacherId', 'name', 'tel', 'password'],
    });
    const lessons = await this.lessonsRepository.findOne({
      where: { teacher: teacher.name },
    });

    const name = await this.teachersRepository.findOne({
      where: { name: updateTeacherDto.name, id: Not(id) },
    });

    if (!teacher) {
      throw new BadRequestException('존재하지 않는 아이디입니다.');
    }
    if (name) {
      throw new BadRequestException('이미 존재하는 이름입니다.');
    }

    if (lessons) {
      const oldName = (await lessons).teacher;
      const newName = updateTeacherDto.name;
      await this.lessonsRepository.update(
        { teacher: oldName },
        { teacher: newName },
      );
    }

    if (updateTeacherDto.password) {
      const isPasswordSame = await bcrypt.compare(
        updateTeacherDto.password,
        teacher.password,
      );

      if (!isPasswordSame) {
        // 비밀번호가 다르면 새로운 비밀번호로 해시하여 업데이트
        const hashedPassword = await bcrypt.hash(updateTeacherDto.password, 12);
        updateTeacherDto.password = hashedPassword;
      } else {
        updateTeacherDto.password = teacher.password;
      }
    } else {
      delete updateTeacherDto.password;
    }

    console.log('updateTeacherDto', updateTeacherDto.password);

    await this.teachersRepository.update(id, updateTeacherDto);
  }

  async remove(id: number) {
    const teacher = this.teachersRepository.findOne({
      where: { id },
    });
    if (!teacher) {
      throw new BadRequestException('존재하지 않는 아이디입니다.');
    }
    try {
      await this.teachersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        '수강생리스트 중에 해당 선생님이 있어 삭제할 수 없습니다.',
        500,
      );
    }
  }
}
