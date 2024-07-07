import { Lessons } from 'src/entities/Lessons';
declare const CreateLessonDto_base: import("@nestjs/mapped-types").MappedType<Pick<Lessons, "name" | "id" | "teacher" | "memo" | "lessontime" | "lessondate">>;
export declare class CreateLessonDto extends CreateLessonDto_base {
}
export {};
