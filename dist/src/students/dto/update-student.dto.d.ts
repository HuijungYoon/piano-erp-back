import { Students } from 'src/entities/Students';
declare const UpdateStudentDto_base: import("@nestjs/mapped-types").MappedType<Pick<Students, "name" | "age" | "register" | "memo" | "tel" | "paymentdue" | "progress" | "tutionfee" | "address" | "closeday">>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
    teacher: string;
}
export {};
