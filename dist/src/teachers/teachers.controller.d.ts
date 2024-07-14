import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teachers } from 'src/entities/Teachers';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(createTeacherDto: CreateTeacherDto): Promise<void>;
    login(teacher: Teachers): Promise<Teachers>;
    logout(req: any, res: any): Promise<any>;
    findAll(): Promise<Teachers[]>;
    me(teacher: Teachers): Teachers;
    findOne(id: number): Promise<Teachers>;
    update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<void>;
    remove(id: number): Promise<void>;
}
