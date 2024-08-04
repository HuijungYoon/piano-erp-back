import { SmssService } from './smss.service';
import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
import { SendSmssDto } from './dto/send-smss.dto';
export declare class SmssController {
    private readonly smssService;
    constructor(smssService: SmssService);
    sendSMS(sendSmssDTo: SendSmssDto): Promise<any>;
    create(createSmssDto: CreateSmssDto): string;
    findAll(): Promise<import("../entities/SMSs").SMSs[]>;
    findOne(id: string): string;
    update(id: string, updateSmssDto: UpdateSmssDto): string;
    remove(id: string): string;
}
