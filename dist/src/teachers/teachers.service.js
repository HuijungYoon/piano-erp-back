"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Teachers_1 = require("../entities/Teachers");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const Lessons_1 = require("../entities/Lessons");
let TeachersService = class TeachersService {
    constructor(teachersRepository, lessonsRepository) {
        this.teachersRepository = teachersRepository;
        this.lessonsRepository = lessonsRepository;
    }
    async create(teacherId, password, name, tel, level) {
        const teacher = await this.teachersRepository.findOne({
            where: { teacherId },
        });
        const teacherName = await this.teachersRepository.findOne({
            where: { name },
        });
        if (teacher) {
            throw new common_1.UnauthorizedException('이미 존재하는 아이디입니다.');
        }
        if (teacherName) {
            throw new common_1.UnauthorizedException('이미 존재하는 이름입니다.');
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
    async findAll() {
        const teachers = await this.teachersRepository.find({
            relations: ['students'],
        });
        return teachers;
    }
    async findOne(id) {
        const teacher = await this.teachersRepository.findOne({
            where: { id },
            select: ['id', 'teacherId', 'name', 'tel', 'level'],
        });
        if (!teacher) {
            throw new common_1.BadRequestException('존재하지 않는 아이디입니다.');
        }
        return teacher;
    }
    async update(id, updateTeacherDto) {
        const teacher = await this.teachersRepository.findOne({
            where: { id },
        });
        const lessons = await this.lessonsRepository.findOne({
            where: { teacher: teacher.name },
        });
        const name = await this.teachersRepository.findOne({
            where: { name: updateTeacherDto.name },
        });
        if (!teacher) {
            throw new common_1.BadRequestException('존재하지 않는 아이디입니다.');
        }
        if (name) {
            throw new common_1.BadRequestException('이미 존재하는 이름입니다.');
        }
        if (lessons) {
            const oldName = (await lessons).teacher;
            const newName = updateTeacherDto.name;
            await this.lessonsRepository.update({ teacher: oldName }, { teacher: newName });
        }
        await this.teachersRepository.update(id, updateTeacherDto);
    }
    async remove(id) {
        const teacher = this.teachersRepository.findOne({
            where: { id },
        });
        if (!teacher) {
            throw new common_1.BadRequestException('존재하지 않는 아이디입니다.');
        }
        try {
            await this.teachersRepository.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException('수강생리스트 중에 해당 선생님이 있어 삭제할 수 없습니다.', 500);
        }
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Teachers_1.Teachers)),
    __param(1, (0, typeorm_1.InjectRepository)(Lessons_1.Lessons)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map