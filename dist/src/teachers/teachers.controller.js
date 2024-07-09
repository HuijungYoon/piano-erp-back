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
exports.TeachersController = void 0;
const common_1 = require("@nestjs/common");
const teachers_service_1 = require("./teachers.service");
const create_teacher_dto_1 = require("./dto/create-teacher.dto");
const update_teacher_dto_1 = require("./dto/update-teacher.dto");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const teacher_decorator_1 = require("../common/decorators/teacher.decorator");
const Teachers_1 = require("../entities/Teachers");
const logged_in_guard_1 = require("../auth/logged-in.guard");
const swagger_1 = require("@nestjs/swagger");
let TeachersController = class TeachersController {
    constructor(teachersService) {
        this.teachersService = teachersService;
    }
    async create(createTeacherDto) {
        await this.teachersService.create(createTeacherDto.teacherId, createTeacherDto.password, createTeacherDto.name, createTeacherDto.tel, createTeacherDto.level);
    }
    async login(teacher) {
        return teacher;
    }
    async logout(req, res) {
        if (!req.user) {
            return res.status(403).send('세션이 만료되었거나 유효하지 않습니다.');
        }
        res.clearCookie('dosi_piano_secret_key', {
            httpOnly: true,
            domain: process.env.NODE_ENV === 'production' ? '.dosipiano.com' : undefined,
            path: '/',
        });
        return res.send('로그아웃 되었습니다.');
    }
    findAll() {
        return this.teachersService.findAll();
    }
    findOne(id) {
        return this.teachersService.findOne(+id);
    }
    update(id, updateTeacherDto) {
        return this.teachersService.update(id, updateTeacherDto);
    }
    remove(id) {
        return this.teachersService.remove(id);
    }
};
exports.TeachersController = TeachersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, teacher_decorator_1.Teacher)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teachers_1.Teachers]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)('dosi_piano_secret_key'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_teacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "remove", null);
exports.TeachersController = TeachersController = __decorate([
    (0, common_1.Controller)('api/teachers'),
    __metadata("design:paramtypes", [teachers_service_1.TeachersService])
], TeachersController);
//# sourceMappingURL=teachers.controller.js.map