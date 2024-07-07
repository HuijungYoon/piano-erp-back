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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teachers = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Students");
const class_validator_1 = require("class-validator");
const Lessons_1 = require("./Lessons");
let Teachers = class Teachers {
};
exports.Teachers = Teachers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int' }),
    __metadata("design:type", Number)
], Teachers.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'teacherId', unique: true, length: 100 }),
    __metadata("design:type", String)
], Teachers.prototype, "teacherId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'password', length: 100, select: false }),
    __metadata("design:type", String)
], Teachers.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 30, unique: true }),
    __metadata("design:type", String)
], Teachers.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'tel', length: 30, unique: true }),
    __metadata("design:type", String)
], Teachers.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'level',
        enum: ['admin', 'teacher', 'assistant'],
        default: 'teacher',
    }),
    __metadata("design:type", String)
], Teachers.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Teachers.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Teachers.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Teachers.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Students_1.Students, (student) => student.teacher),
    __metadata("design:type", Array)
], Teachers.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Lessons_1.Lessons, (lesson) => lesson.teachers),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Teachers.prototype, "lessons", void 0);
exports.Teachers = Teachers = __decorate([
    (0, typeorm_1.Index)('tel', ['tel'], { unique: true }),
    (0, typeorm_1.Index)('teacherId', ['teacherId'], { unique: true }),
    (0, typeorm_1.Index)('name', ['name'], { unique: true }),
    (0, typeorm_1.Entity)({ schema: 'pianoerp', name: 'teachers' })
], Teachers);
//# sourceMappingURL=Teachers.js.map