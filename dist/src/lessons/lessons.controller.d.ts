import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto): Promise<void>;
    findAll(): Promise<import("../entities/Lessons").Lessons[]>;
    findOne(id: string): Promise<import("../entities/Lessons").Lessons>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<void>;
    remove(id: string): Promise<void>;
}