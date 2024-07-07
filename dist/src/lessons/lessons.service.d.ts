import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Repository } from 'typeorm';
import { Lessons } from 'src/entities/Lessons';
import { Students } from 'src/entities/Students';
export declare class LessonsService {
    private lessonsRepository;
    private studentsRepository;
    constructor(lessonsRepository: Repository<Lessons>, studentsRepository: Repository<Students>);
    create(name: string, teacher: string, lessontime: string, lessondate: Date, memo: string): Promise<void>;
    findAll(): Promise<Lessons[]>;
    findOne(id: number): Promise<Lessons>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<void>;
    remove(id: number): Promise<void>;
}
