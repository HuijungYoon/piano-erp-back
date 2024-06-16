import { Injectable } from '@nestjs/common';
import { CreateMacroDto } from './dto/create-macro.dto';
import { UpdateMacroDto } from './dto/update-macro.dto';

@Injectable()
export class MacrosService {
  create(createMacroDto: CreateMacroDto) {
    return 'This action adds a new macro';
  }

  findAll() {
    return `This action returns all macros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} macro`;
  }

  update(id: number, updateMacroDto: UpdateMacroDto) {
    return `This action updates a #${id} macro`;
  }

  remove(id: number) {
    return `This action removes a #${id} macro`;
  }
}
