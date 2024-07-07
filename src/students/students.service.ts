import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from 'src/entities/Students';
import { Teachers } from 'src/entities/Teachers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lessons } from 'src/entities/Lessons';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students) private studentRepository: Repository<Students>,
    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,
    @InjectRepository(Lessons)
    private lessonsRepository: Repository<Lessons>,
  ) {}

  async create(
    name: string,
    progress: string,
    paymentdue: string,
    age: number,
    tutionfee: number,
    tel: string,
    teacherName: string,
    address: string,
    memo: string,
    register: Date,
    closeday: Date,
  ) {
    const teacher = await this.teachersRepository.findOne({
      where: { name: teacherName },
    });
    const studenttel = await this.studentRepository.findOne({
      where: { tel },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with name ${teacherName} not found`);
    }
    if (studenttel) {
      throw new UnauthorizedException(`이미 등록된 전화번호입니다.`);
    }

    await this.studentRepository.save({
      name,
      progress,
      age,
      tutionfee,
      tel,
      teacher,
      address,
      memo,
      register,
      closeday,
      paymentdue,
    });
  }

  async findAll() {
    // const students = this.studentRepository.find({
    //   relations: ['teacher'],
    //   where: { closeday: null },
    // });
    const students = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.teacher', 'teacher')
      .leftJoinAndSelect('student.lessons', 'lessons')
      .orderBy('student.id', 'DESC')
      .where('student.closeday IS NULL')
      .getMany();
    return students;
  }

  findOne(id: number) {
    const student = this.studentRepository.findOne({
      where: { id },
      relations: ['teacher', 'lessons'],
    });
    if (!student) {
      throw new BadRequestException(`존재하지 않는 학생입니다.`);
    }
    return student;
  }

  async search(teacherId?: string, studentName?: string, status?: string) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.teacher', 'teacher')
      .where('student.deletedAt IS NULL');

    if (teacherId) {
      query.andWhere('teacher.teacherId = :teacherId', { teacherId });
    }
    if (studentName) {
      query.andWhere('student.name LIKE :studentName', {
        studentName: `%${studentName}%`,
      });
    }
    if (status) {
      if (status === 'attending') {
        query.andWhere('student.closeday IS NULL');
      } else if (status === 'onLeave') {
        query.andWhere('student.closeday IS NOT NULL');
      }
    }

    const sql = query.getSql();
    const parameters = query.getParameters();
    const result = await query.getMany();

    return result;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({ where: { id } });

    const teacher = await this.teachersRepository.findOne({
      where: { name: updateStudentDto.teacher },
    });

    const studentIncludeTel = `${student.name}(${student.tel})`;
    const lessons = await this.lessonsRepository.findOne({
      where: { name: studentIncludeTel },
    });
    if (!teacher) {
      throw new NotFoundException(`선생님이 존재하지 않습니다.`);
    }
    if (!student) {
      throw new BadRequestException(`존재하지 않는 학생입니다.`);
    }
    if ((await student).tel !== updateStudentDto.tel) {
      const existingStudentWithTel = await this.studentRepository.findOne({
        where: { tel: updateStudentDto.tel },
      });

      if (existingStudentWithTel) {
        throw new UnauthorizedException(`이미 등록된 전화번호입니다.`);
      }
    }

    if (lessons) {
      const oldName = studentIncludeTel;
      const newName = `${updateStudentDto.name}(${updateStudentDto.tel})`;
      await this.lessonsRepository.update({ name: oldName }, { name: newName });
    }

    const newUpdateStudentDto = { ...updateStudentDto, teacher };

    await this.studentRepository.update(id, newUpdateStudentDto);
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new BadRequestException(`존재하지 않는 학생입니다.`);
    }

    await this.studentRepository.delete(id);
  }
}
