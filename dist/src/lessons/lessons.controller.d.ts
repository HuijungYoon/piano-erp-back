import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto): Promise<void>;
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
        students: import("../entities/Students").Students;
        teachers: import("../entities/Teachers").Teachers;
    }[]>;
    findAll(teacher?: any): Promise<{
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
        students: import("../entities/Students").Students;
        teachers: import("../entities/Teachers").Teachers;
    }[]>;
    findOne(id: string): Promise<import("../entities/Lessons").Lessons>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<void>;
    remove(id: string): Promise<void>;
}
