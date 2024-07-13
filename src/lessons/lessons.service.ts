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
import { Teachers } from 'src/entities/Teachers';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lessons)
    private lessonsRepository: Repository<Lessons>,
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,
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

    const findTeacher = await this.teachersRepository.findOne({
      where: { name: teacher },
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
      teachers: findTeacher,
    });
  }

  findAll() {
    const lessons = this.lessonsRepository.find({
      relations: ['students'],
      order: { lessondate: 'DESC' },
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

  async search(
    startDate?: Date,
    endDate?: Date,
    teacherId?: string,
    studentName?: string,
  ) {
    const query = this.lessonsRepository
      .createQueryBuilder('lessons')
      .leftJoinAndSelect('lessons.students', 'students')
      .leftJoinAndSelect('lessons.teachers', 'teachers');

    if (startDate) {
      query.andWhere('lessons.lessondate >= :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('lessons.lessondate <= :endDate', { endDate });
    }

    if (teacherId) {
      query.andWhere('teachers.teacherId = :teacherId', { teacherId });
    }
    query.orderBy('lessons.lessondate', 'DESC');

    if (studentName) {
      query.andWhere('students.name LIKE :studentName', {
        studentName: `%${studentName}%`,
      });
    }

    const lessons = await query.getMany();
    console.log('lessons', lessons);

    return lessons;
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

  async remove(id: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
    });

    if (!lesson) {
      throw new BadRequestException(`존재하지 않는 수업입니다.`);
    }
    await this.lessonsRepository.delete(id);
  }
}
