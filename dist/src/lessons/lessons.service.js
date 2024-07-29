"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Lessons_1 = require("../entities/Lessons");
const Students_1 = require("../entities/Students");
const Teachers_1 = require("../entities/Teachers");
let LessonsService = class LessonsService {
    constructor(lessonsRepository, studentsRepository, teachersRepository) {
        this.lessonsRepository = lessonsRepository;
        this.studentsRepository = studentsRepository;
        this.teachersRepository = teachersRepository;
    }
    async create(name, teacher, lessontime, lessondate, memo) {
        const student = await this.studentsRepository.findOne({
            where: { name },
        });
        const findTeacher = await this.teachersRepository.findOne({
            where: { name: teacher },
        });
        if (!student) {
            throw new common_1.UnauthorizedException(`존재하지 않는 학생입니다.`);
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
            throw new common_1.BadRequestException(`사용자 정보가 없습니다.`);
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
        const lessonsWithId = lessons.map((lesson, index) => (Object.assign(Object.assign({}, lesson), { descid: index + 1 })));
        return lessonsWithId;
    }
    async findOne(id) {
        const lesson = await this.lessonsRepository.findOne({
            where: { id },
            relations: ['students'],
        });
        if (!lesson) {
            throw new common_1.BadRequestException(`존재하지 않는 수업입니다.`);
        }
        return lesson;
    }
    async search(startDate, endDate, teacherId, studentName, teacher) {
        const query = this.lessonsRepository
            .createQueryBuilder('lessons')
            .leftJoinAndSelect('lessons.students', 'students')
            .leftJoinAndSelect('lessons.teachers', 'teachers');
        if (teacher.level === 'admin' && teacherId) {
            query.andWhere('teachers.teacherId = :teacherId', { teacherId });
        }
        if (teacher.level === 'teacher') {
            query.andWhere('teachers.id = :teacherId', { teacherId: teacher.id });
        }
        if (startDate) {
            query.andWhere('lessons.lessondate >= :startDate', { startDate });
        }
        if (endDate) {
            query.andWhere('lessons.lessondate <= :endDate', { endDate });
        }
        query.orderBy('lessons.lessondate', 'DESC');
        if (studentName) {
            query.andWhere('students.name LIKE :studentName', {
                studentName: `%${studentName}%`,
            });
        }
        const lessons = await query.getMany();
        const lessonsWithId = lessons.map((lesson, index) => (Object.assign(Object.assign({}, lesson), { descid: index + 1 })));
        return lessonsWithId;
    }
    async update(id, updateLessonDto) {
        const lesson = await this.lessonsRepository.findOne({
            where: { id },
            relations: ['students'],
        });
        if (!lesson) {
            throw new common_1.BadRequestException(`존재하지 않는 수업입니다.`);
        }
        console.log('lesson.student', lesson.students);
        if (updateLessonDto.name && updateLessonDto.name !== lesson.students.name) {
            const student = await this.studentsRepository.findOne({
                where: { tel: updateLessonDto.name.split('(')[1].slice(0, -1) },
                relations: ['lessons'],
            });
            console.log('name', updateLessonDto.name.split('(')[1].slice(0, -1));
            console.log('student', student);
            if (!student) {
                throw new common_1.BadRequestException(`존재하지 않는 학생입니다.`);
            }
            if (lesson.students.lessons) {
                lesson.students.lessons = lesson.students.lessons.filter((l) => l.id !== lesson.id);
            }
            student.lessons.push(lesson);
            await this.studentsRepository.save(student);
        }
        await this.lessonsRepository.update(id, updateLessonDto);
    }
    async remove(id) {
        const lesson = await this.lessonsRepository.findOne({
            where: { id },
        });
        if (!lesson) {
            throw new common_1.BadRequestException(`존재하지 않는 수업입니다.`);
        }
        await this.lessonsRepository.delete(id);
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Lessons_1.Lessons)),
    __param(1, (0, typeorm_1.InjectRepository)(Students_1.Students)),
    __param(2, (0, typeorm_1.InjectRepository)(Teachers_1.Teachers)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map