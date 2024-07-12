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
    findAll(): Promise<Lessons[]>;
    findOne(id: number): Promise<Lessons>;
    search(startDate: Date, endDate: Date, teacherId?: string, studentName?: string): Promise<Lessons[]>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<void>;
    remove(id: number): Promise<void>;
}
