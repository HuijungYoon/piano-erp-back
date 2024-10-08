import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Repository } from 'typeorm';
import { Lessons } from 'src/entities/Lessons';
import { Students } from 'src/entities/Students';
import { Teachers } from 'src/entities/Teachers';
export declare class LessonsService {
    private lessonsRepository;
    private studentsRepository;
    private teachersRepository;
    constructor(lessonsRepository: Repository<Lessons>, studentsRepository: Repository<Students>, teachersRepository: Repository<Teachers>);
    create(name: string, teacher: string, lessontime: string, lessondate: Date, memo: string): Promise<void>;
    findAll(teacher: any): Promise<{
        descid: number;
        id: number;
        name: string;
        teacher: string;
        memo: string;
        lessontime: string;
        lessondate: Date;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        students: Students;
        teachers: Teachers;
    }[]>;
    findOne(id: number): Promise<Lessons>;
    search(startDate?: Date, endDate?: Date, teacherId?: string, studentName?: string, teacher?: any): Promise<{
        descid: number;
        id: number;
        name: string;
        teacher: string;
        memo: string;
        lessontime: string;
        lessondate: Date;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        students: Students;
        teachers: Teachers;
    }[]>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<void>;
    remove(id: number): Promise<void>;
}
