import { Students } from './Students';
import { Lessons } from './Lessons';
export declare class Teachers {
    id: number;
    teacherId: string;
    password: string;
    name: string;
    tel: string;
    level: 'admin' | 'teacher' | 'assistant';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    students: Students[];
    lessons: Lessons[];
}
