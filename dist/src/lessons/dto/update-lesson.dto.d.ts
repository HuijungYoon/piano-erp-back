import { Lessons } from 'src/entities/Lessons';
declare const UpdateLessonDto_base: import("@nestjs/mapped-types").MappedType<Pick<Lessons, "name" | "id" | "teacher" | "memo" | "lessontime" | "lessondate">>;
export declare class UpdateLessonDto extends UpdateLessonDto_base {
}
export {};
