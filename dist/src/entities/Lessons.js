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
exports.Lessons = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Students");
const Teachers_1 = require("./Teachers");
let Lessons = class Lessons {
};
exports.Lessons = Lessons;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int' }),
    __metadata("design:type", Number)
], Lessons.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 30 }),
    __metadata("design:type", String)
], Lessons.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'teacher', length: 30 }),
    __metadata("design:type", String)
], Lessons.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'memo', nullable: true }),
    __metadata("design:type", String)
], Lessons.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'lessontime', length: 30 }),
    __metadata("design:type", String)
], Lessons.prototype, "lessontime", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'lessondate' }),
    __metadata("design:type", Date)
], Lessons.prototype, "lessondate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lessons.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lessons.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Lessons.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Students_1.Students, (student) => student.lessons),
    __metadata("design:type", Students_1.Students)
], Lessons.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teachers_1.Teachers, (teacher) => teacher.lessons),
    __metadata("design:type", Teachers_1.Teachers)
], Lessons.prototype, "teachers", void 0);
exports.Lessons = Lessons = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pianoerp', name: 'lessons' })
], Lessons);
//# sourceMappingURL=Lessons.js.map