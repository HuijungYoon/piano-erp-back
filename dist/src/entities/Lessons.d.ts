import { Students } from './Students';
import { Teachers } from './Teachers';
export declare class Lessons {
    id: number;
    name: string;
    teacher: string;
    memo: string;
    lessontime: string;
    lessondate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    students: Students;
    teachers: Teachers;
}
