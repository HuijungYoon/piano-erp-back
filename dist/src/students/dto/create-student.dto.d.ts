import { Students } from 'src/entities/Students';
declare const CreateStudentDto_base: import("@nestjs/mapped-types").MappedType<Pick<Students, "name" | "id" | "age" | "memo" | "tel" | "paymentdue" | "progress" | "tutionfee" | "address" | "register" | "closeday">>;
export declare class CreateStudentDto extends CreateStudentDto_base {
    teacher: string;
}
export {};
