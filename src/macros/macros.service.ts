import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMacroDto } from './dto/create-macro.dto';
import { UpdateMacroDto } from './dto/update-macro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Macros } from 'src/entities/Macros';
import { Repository } from 'typeorm';

@Injectable()
export class MacrosService {
  constructor(
    @InjectRepository(Macros) private macroRepository: Repository<Macros>,
  ) {}

  async create(name: string, format: string) {
    const macro = await this.macroRepository.findOne({
      where: { name },
    });

    if (macro) {
      throw new UnauthorizedException(`이미 존재하는 매크로 이름입니다.`);
    }

    await this.macroRepository.save({
      name,
      format,
    });
  }

  async findAll() {
    const macros = await this.macroRepository.find();
    return macros;
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
