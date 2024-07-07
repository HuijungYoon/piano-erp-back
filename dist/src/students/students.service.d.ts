import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from 'src/entities/Students';
import { Teachers } from 'src/entities/Teachers';
import { Repository } from 'typeorm';
import { Lessons } from 'src/entities/Lessons';
export declare class StudentsService {
    private studentRepository;
    private teachersRepository;
    private lessonsRepository;
    constructor(studentRepository: Repository<Students>, teachersRepository: Repository<Teachers>, lessonsRepository: Repository<Lessons>);
    create(name: string, progress: string, paymentdue: string, age: number, tutionfee: number, tel: string, teacherName: string, address: string, memo: string, register: Date, closeday: Date): Promise<void>;
    findAll(): Promise<Students[]>;
    findOne(id: number): Promise<Students>;
    search(teacherId?: string, studentName?: string, status?: string): Promise<Students[]>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<void>;
    remove(id: number): Promise<void>;
}
