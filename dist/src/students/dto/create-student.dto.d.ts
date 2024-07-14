import { Students } from 'src/entities/Students';
declare const CreateStudentDto_base: import("@nestjs/mapped-types").MappedType<Pick<Students, "name" | "age" | "register" | "id" | "tel" | "memo" | "paymentdue" | "progress" | "tutionfee" | "address" | "closeday">>;
export declare class CreateStudentDto extends CreateStudentDto_base {
    teacher: string;
}
export {};
