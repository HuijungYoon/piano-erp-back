import { Teachers } from 'src/entities/Teachers';
declare const CreateTeacherDto_base: import("@nestjs/common").Type<Pick<Teachers, "name" | "tel" | "teacherId" | "password" | "level">>;
export declare class CreateTeacherDto extends CreateTeacherDto_base {
}
export {};
