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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const update_student_dto_1 = require("./dto/update-student.dto");
const create_student_dto_1 = require("./dto/create-student.dto");
const teacher_decorator_1 = require("../common/decorators/teacher.decorator");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async create(createStudentDto) {
        await this.studentsService.create(createStudentDto.name, createStudentDto.progress, createStudentDto.paymentdue, createStudentDto.age, createStudentDto.tutionfee, createStudentDto.tel, createStudentDto.teacher, createStudentDto.address, createStudentDto.memo, createStudentDto.register, createStudentDto.closeday);
    }
    search(teacherId, studentName, status, teacher) {
        return this.studentsService.search(teacherId, studentName, status, teacher);
    }
    findAll(teacher) {
        return this.studentsService.findAll(teacher);
    }
    findOne(id) {
        return this.studentsService.findOne(+id);
    }
    update(id, updateStudentDto) {
        return this.studentsService.update(+id, updateStudentDto);
    }
    remove(id) {
        return this.studentsService.remove(+id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('teacherId')),
    __param(1, (0, common_1.Query)('studentName')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, teacher_decorator_1.Teacher)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, teacher_decorator_1.Teacher)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "remove", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('api/students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map