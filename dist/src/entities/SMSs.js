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
exports.SMSs = void 0;
const typeorm_1 = require("typeorm");
let SMSs = class SMSs {
};
exports.SMSs = SMSs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int' }),
    __metadata("design:type", Number)
], SMSs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 30 }),
    __metadata("design:type", String)
], SMSs.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'tel', length: 30 }),
    __metadata("design:type", String)
], SMSs.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'content' }),
    __metadata("design:type", String)
], SMSs.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'smstype',
        enum: ['SMS', 'LMS'],
        default: 'SMS',
    }),
    __metadata("design:type", String)
], SMSs.prototype, "smstype", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'status',
        enum: ['success', 'fail'],
        default: 'success',
    }),
    __metadata("design:type", String)
], SMSs.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { name: 'sendtime' }),
    __metadata("design:type", Date)
], SMSs.prototype, "sendtime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SMSs.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SMSs.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], SMSs.prototype, "deletedAt", void 0);
exports.SMSs = SMSs = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pianoerp', name: 'smss' })
], SMSs);
//# sourceMappingURL=SMSs.js.map