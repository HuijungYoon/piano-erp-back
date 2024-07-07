"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLessonDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Lessons_1 = require("../../entities/Lessons");
class UpdateLessonDto extends (0, mapped_types_1.PickType)(Lessons_1.Lessons, [
    'id',
    'name',
    'teacher',
    'memo',
    'lessontime',
    'lessondate',
]) {
}
exports.UpdateLessonDto = UpdateLessonDto;
//# sourceMappingURL=update-lesson.dto.js.map