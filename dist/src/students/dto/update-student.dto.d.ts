import { Students } from 'src/entities/Students';
declare const UpdateStudentDto_base: import("@nestjs/mapped-types").MappedType<Pick<Students, "name" | "age" | "memo" | "tel" | "paymentdue" | "progress" | "tutionfee" | "address" | "register" | "closeday">>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
    teacher: string;
}
export {};
