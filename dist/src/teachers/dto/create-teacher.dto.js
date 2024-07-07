"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeacherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Teachers_1 = require("../../entities/Teachers");
class CreateTeacherDto extends (0, swagger_1.PickType)(Teachers_1.Teachers, [
    'teacherId',
    'password',
    'name',
    'tel',
    'level',
]) {
}
exports.CreateTeacherDto = CreateTeacherDto;
//# sourceMappingURL=create-teacher.dto.js.map