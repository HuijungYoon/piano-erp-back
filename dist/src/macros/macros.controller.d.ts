import { MacrosService } from './macros.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import { UpdateMacroDto } from './dto/update-macro.dto';
export declare class MacrosController {
    private readonly macrosService;
    constructor(macrosService: MacrosService);
    create(createMacroDto: CreateMacroDto): Promise<void>;
    findAll(): Promise<import("../entities/Macros").Macros[]>;
    findOne(id: string): Promise<import("../entities/Macros").Macros>;
    update(id: string, updateMacroDto: UpdateMacroDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<void>;
}
