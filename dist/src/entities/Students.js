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
exports.Students = void 0;
const typeorm_1 = require("typeorm");
const Teachers_1 = require("./Teachers");
const Lessons_1 = require("./Lessons");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Students = class Students {
};
exports.Students = Students;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int' }),
    __metadata("design:type", Number)
], Students.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 30 }),
    __metadata("design:type", String)
], Students.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'paymentdue', length: 30 }),
    __metadata("design:type", String)
], Students.prototype, "paymentdue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)('varchar', { name: 'progress', length: 100 }),
    __metadata("design:type", String)
], Students.prototype, "progress", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('int', { name: 'age' }),
    __metadata("design:type", Number)
], Students.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('int', { name: 'tutionfee' }),
    __metadata("design:type", Number)
], Students.prototype, "tutionfee", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'tel', length: 30, unique: true }),
    __metadata("design:type", String)
], Students.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teachers_1.Teachers, (teacher) => teacher.students),
    __metadata("design:type", Teachers_1.Teachers)
], Students.prototype, "teacher", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar', { name: 'address', length: 100 }),
    __metadata("design:type", String)
], Students.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)('text', { name: 'memo' }),
    __metadata("design:type", String)
], Students.prototype, "memo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, typeorm_1.Column)('datetime', { name: 'register', nullable: false }),
    __metadata("design:type", Date)
], Students.prototype, "register", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, typeorm_1.Column)('datetime', { name: 'closeday', nullable: true }),
    __metadata("design:type", Date)
], Students.prototype, "closeday", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Students.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Students.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Students.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Lessons_1.Lessons, (lesson) => lesson.students),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Students.prototype, "lessons", void 0);
exports.Students = Students = __decorate([
    (0, typeorm_1.Index)('tel', ['tel'], { unique: true }),
    (0, typeorm_1.Entity)({ schema: 'pianoerp', name: 'students' })
], Students);
//# sourceMappingURL=Students.js.map