import { SmssService } from './smss.service';
import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
export declare class SmssController {
    private readonly smssService;
    constructor(smssService: SmssService);
    sendSMS(to: string, content: string): Promise<any>;
    create(createSmssDto: CreateSmssDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSmssDto: UpdateSmssDto): string;
    remove(id: string): string;
}
