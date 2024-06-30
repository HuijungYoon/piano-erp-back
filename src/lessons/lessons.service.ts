import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Repository } from 'typeorm';
import { Lessons } from 'src/entities/Lessons';
import { Students } from 'src/entities/Students';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lessons)
    private lessonsRepository: Repository<Lessons>,
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}
  async create(
    name: string,
    teacher: string,
    lessontime: string,
    lessondate: Date,
    memo: string,
  ) {
    const student = await this.studentsRepository.findOne({
      where: { name },
    });

    if (!student) {
      throw new UnauthorizedException(`존재하지 않는 학생입니다.`);
    }
    await this.lessonsRepository.save({
      name: `${name}(${student.tel})`,
      teacher,
      lessontime,
      lessondate,
      memo,
      students: student,
    });
  }

  findAll() {
    const lessons = this.lessonsRepository.find({
      relations: ['students'],
    });

    return lessons;
  }

  async findOne(id: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
    });
    if (!lesson) {
      throw new BadRequestException(`존재하지 않는 수업입니다.`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
    });

    if (!lesson) {
      throw new BadRequestException(`존재하지 않는 수업입니다.`);
    }

    await this.lessonsRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
