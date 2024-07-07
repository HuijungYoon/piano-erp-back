import { PassportSerializer } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { Teachers } from '../entities/Teachers';
import { AuthService } from './auth.service';
export declare class LocalSerializer extends PassportSerializer {
    private readonly authService;
    private teachersRepository;
    constructor(authService: AuthService, teachersRepository: Repository<Teachers>);
    serializeUser(teacher: Teachers, done: CallableFunction): void;
    deserializeUser(teacherId: string, done: CallableFunction): Promise<any>;
}
