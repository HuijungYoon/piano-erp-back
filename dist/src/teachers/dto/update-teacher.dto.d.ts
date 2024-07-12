import { Teachers } from 'src/entities/Teachers';
declare const UpdateTeacherDto_base: import("@nestjs/mapped-types").MappedType<Pick<Teachers, "name" | "tel" | "teacherId">>;
export declare class UpdateTeacherDto extends UpdateTeacherDto_base {
    password?: string;
}
export {};
