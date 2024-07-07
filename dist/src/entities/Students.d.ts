import { Teachers } from './Teachers';
import { Lessons } from './Lessons';
export declare class Students {
    id: number;
    name: string;
    paymentdue: string;
    progress?: string;
    age: number;
    tutionfee: number;
    tel: string;
    teacher: Teachers;
    address: string;
    memo?: string;
    register: Date;
    closeday?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    lessons: Lessons[];
}
