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

  async findAll(teacher) {
    if (!teacher) {
      throw new BadRequestException(`사용자 정보가 없습니다.`);
    }

    const query = this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.students', 'students')
      .leftJoinAndSelect('lesson.teachers', 'teachers')
      .orderBy('lesson.lessondate', 'DESC');

    if (teacher.level === 'teacher') {
      query.andWhere('teachers.id = :teacherId', { teacherId: teacher.id });
    }
    const lessons = await query.getMany();

    const lessonsWithId = lessons.map((lesson, index) => ({
      ...lesson,
      descid: index + 1,
    }));
    return lessonsWithId;
    // const lessons = this.lessonsRepository.find({
    //   relations: ['students'],
    //   order: { lessondate: 'DESC' },
    // });

    // return lessons;
  }

  async findOne(id: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
      relations: ['students'],
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
    teacher?: any,
  ) {
    const query = this.lessonsRepository
      .createQueryBuilder('lessons')
      .leftJoinAndSelect('lessons.students', 'students')
      .leftJoinAndSelect('lessons.teachers', 'teachers');

    // 전체 조회
    if (teacher.level === 'admin' && teacherId) {
      query.andWhere('teachers.teacherId = :teacherId', { teacherId });
    }

    // 자기 학생만 조회
    if (teacher.level === 'teacher') {
      query.andWhere('teachers.id = :teacherId', { teacherId: teacher.id });
    }

    if (startDate) {
      query.andWhere('lessons.lessondate >= :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('lessons.lessondate <= :endDate', { endDate });
    }

    // if (teacherId) {
    //   query.andWhere('teachers.teacherId = :teacherId', { teacherId });
    // }
    query.orderBy('lessons.lessondate', 'DESC');

    if (studentName) {
      query.andWhere('students.name LIKE :studentName', {
        studentName: `%${studentName}%`,
      });
    }

    const lessons = await query.getMany();
    const lessonsWithId = lessons.map((lesson, index, array) => ({
      ...lesson,
      descid: array.length - index,
    }));

    return lessonsWithId;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
      relations: ['students'], // student 관계를 포함하여 조회
    });

    if (!lesson) {
      throw new BadRequestException(`존재하지 않는 수업입니다.`);
    }

    console.log('lesson.student', lesson.students);
    // 학생 정보가 변경되었는지 확인
    if (updateLessonDto.name && updateLessonDto.name !== lesson.students.name) {
      const student = await this.studentsRepository.findOne({
        where: { tel: updateLessonDto.name.split('(')[1].slice(0, -1) },
        relations: ['lessons'],
      });
      console.log('name', updateLessonDto.name.split('(')[1].slice(0, -1));
      console.log('student', student);

      if (!student) {
        throw new BadRequestException(`존재하지 않는 학생입니다.`);
      }

      // 기존 학생의 lessons에서 이 수업을 제거
      if (lesson.students.lessons) {
        lesson.students.lessons = lesson.students.lessons.filter(
          (l) => l.id !== lesson.id,
        );
      }

      // 새 학생의 lessons에 이 수업을 추가
      student.lessons.push(lesson);

      await this.studentsRepository.save(student);
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
