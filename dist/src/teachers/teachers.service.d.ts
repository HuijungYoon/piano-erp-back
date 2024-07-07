import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teachers } from 'src/entities/Teachers';
import { Repository } from 'typeorm';
import { Lessons } from 'src/entities/Lessons';
export declare class TeachersService {
    private teachersRepository;
    private lessonsRepository;
    constructor(teachersRepository: Repository<Teachers>, lessonsRepository: Repository<Lessons>);
    create(teacherId: string, password: string, name: string, tel: string, level: 'admin' | 'teacher' | 'assistant'): Promise<void>;
    findAll(): Promise<Teachers[]>;
    findOne(id: number): Promise<Teachers>;
    update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<void>;
    remove(id: number): Promise<void>;
}
