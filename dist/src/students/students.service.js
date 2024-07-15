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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const Students_1 = require("../entities/Students");
const Teachers_1 = require("../entities/Teachers");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Lessons_1 = require("../entities/Lessons");
let StudentsService = class StudentsService {
    constructor(studentRepository, teachersRepository, lessonsRepository) {
        this.studentRepository = studentRepository;
        this.teachersRepository = teachersRepository;
        this.lessonsRepository = lessonsRepository;
    }
    async create(name, progress, paymentdue, age, tutionfee, tel, teacherName, address, memo, register, closeday) {
        const teacher = await this.teachersRepository.findOne({
            where: { name: teacherName },
        });
        const studenttel = await this.studentRepository.findOne({
            where: { tel },
        });
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with name ${teacherName} not found`);
        }
        if (studenttel) {
            throw new common_1.UnauthorizedException(`이미 등록된 전화번호입니다.`);
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
    async findAll(teacher) {
        const query = this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.teacher', 'teacher')
            .leftJoinAndSelect('student.lessons', 'lessons')
            .orderBy('student.id', 'DESC')
            .where('student.closeday IS NULL');
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.level) === 'teacher') {
            query.andWhere('teacher.id = :teacherId', { teacherId: teacher.id });
        }
        return query.getMany();
    }
    findOne(id) {
        const student = this.studentRepository.findOne({
            where: { id },
            relations: ['teacher', 'lessons'],
        });
        if (!student) {
            throw new common_1.BadRequestException(`존재하지 않는 학생입니다.`);
        }
        return student;
    }
    async search(teacherId, studentName, status, teacher) {
        const query = this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.teacher', 'teacher')
            .where('student.deletedAt IS NULL');
        if (teacherId && teacher.level === 'admin') {
            query.andWhere('teacher.teacherId = :teacherId', { teacherId });
        }
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.level) === 'teacher') {
            query.andWhere('teacher.id = :teacherId', { teacherId: teacher.id });
        }
        if (studentName) {
            query.andWhere('student.name LIKE :studentName', {
                studentName: `%${studentName}%`,
            });
        }
        if (status) {
            if (status === 'attending') {
                query.andWhere('student.closeday IS NULL');
            }
            else if (status === 'onLeave') {
                query.andWhere('student.closeday IS NOT NULL');
            }
        }
        const sql = query.getSql();
        const parameters = query.getParameters();
        const result = await query.getMany();
        return result;
    }
    async update(id, updateStudentDto) {
        const student = await this.studentRepository.findOne({ where: { id } });
        const teacher = await this.teachersRepository.findOne({
            where: { name: updateStudentDto.teacher },
        });
        const studentIncludeTel = `${student.name}(${student.tel})`;
        const lessons = await this.lessonsRepository.findOne({
            where: { name: studentIncludeTel },
        });
        if (!teacher) {
            throw new common_1.NotFoundException(`선생님이 존재하지 않습니다.`);
        }
        if (!student) {
            throw new common_1.BadRequestException(`존재하지 않는 학생입니다.`);
        }
        if ((await student).tel !== updateStudentDto.tel) {
            const existingStudentWithTel = await this.studentRepository.findOne({
                where: { tel: updateStudentDto.tel },
            });
            if (existingStudentWithTel) {
                throw new common_1.UnauthorizedException(`이미 등록된 전화번호입니다.`);
            }
        }
        if (lessons) {
            const oldName = studentIncludeTel;
            const newName = `${updateStudentDto.name}(${updateStudentDto.tel})`;
            await this.lessonsRepository.update({ name: oldName }, { name: newName });
        }
        const newUpdateStudentDto = Object.assign(Object.assign({}, updateStudentDto), { teacher });
        await this.studentRepository.update(id, newUpdateStudentDto);
    }
    async remove(id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException(`존재하지 않는 학생입니다.`);
        }
        await this.studentRepository.delete(id);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Students_1.Students)),
    __param(1, (0, typeorm_1.InjectRepository)(Teachers_1.Teachers)),
    __param(2, (0, typeorm_1.InjectRepository)(Lessons_1.Lessons)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map