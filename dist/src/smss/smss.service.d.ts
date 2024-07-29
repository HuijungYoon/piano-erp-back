import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
import { Students } from 'src/entities/Students';
import { Repository } from 'typeorm';
import { SMSs } from 'src/entities/SMSs';
import { SendSmssDto } from './dto/send-smss.dto';
export declare class SmssService {
    private studentsRepository;
    private smssRepository;
    constructor(studentsRepository: Repository<Students>, smssRepository: Repository<SMSs>);
    private readonly uri;
    private readonly accessKey;
    private readonly secretKey;
    private readonly url;
    private makeSignature;
    sendSMS(sendSmssDTo: SendSmssDto): Promise<any>;
    create(createSmssDto: CreateSmssDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSmssDto: UpdateSmssDto): string;
    remove(id: number): string;
}
