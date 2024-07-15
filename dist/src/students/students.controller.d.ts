import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<void>;
    search(teacherId?: string, studentName?: string, status?: string, teacher?: any): Promise<import("../entities/Students").Students[]>;
    findAll(teacher?: any): Promise<import("../entities/Students").Students[]>;
    findOne(id: string): Promise<import("../entities/Students").Students>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<void>;
    remove(id: string): Promise<void>;
}
