import { UpdateMacroDto } from './dto/update-macro.dto';
import { Macros } from 'src/entities/Macros';
import { Repository } from 'typeorm';
export declare class MacrosService {
    private macroRepository;
    constructor(macroRepository: Repository<Macros>);
    create(name: string, format: string): Promise<void>;
    findAll(): Promise<Macros[]>;
    findOne(id: number): Promise<Macros>;
    update(id: number, updateMacroDto: UpdateMacroDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<void>;
}
