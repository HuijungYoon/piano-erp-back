import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
export declare class SmssService {
    private readonly uri;
    private readonly accessKey;
    private readonly secretKey;
    private readonly url;
    private makeSignature;
    sendSMS(to: string, content: string): Promise<any>;
    create(createSmssDto: CreateSmssDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSmssDto: UpdateSmssDto): string;
    remove(id: number): string;
}
