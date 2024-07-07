"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeacherDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Teachers_1 = require("../../entities/Teachers");
class UpdateTeacherDto extends (0, mapped_types_1.PickType)(Teachers_1.Teachers, [
    'teacherId',
    'name',
    'tel',
]) {
}
exports.UpdateTeacherDto = UpdateTeacherDto;
//# sourceMappingURL=update-teacher.dto.js.map