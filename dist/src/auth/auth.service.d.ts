import { Repository } from 'typeorm';
import { Teachers } from '../entities/Teachers';
export declare class AuthService {
    private teachersRepository;
    constructor(teachersRepository: Repository<Teachers>);
    validateTeacher(teacherId: string, password: string): Promise<{
        id: number;
        teacherId: string;
        name: string;
        tel: string;
        level: "teacher" | "admin" | "assistant";
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        students: import("../entities/Students").Students[];
        lessons: import("../entities/Lessons").Lessons[];
    }>;
}
