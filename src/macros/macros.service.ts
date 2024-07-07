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

  async findOne(id: number) {
    const macro = this.macroRepository.findOne({
      where: { id },
    });

    if (!macro) {
      throw new UnauthorizedException(`존재하지 않는 매크로입니다.`);
    }
    return await macro;
  }

  async update(id: number, updateMacroDto: UpdateMacroDto) {
    const macro = this.macroRepository.findOne({
      where: { id },
    });
    if (!macro) {
      throw new UnauthorizedException(`존재하지 않는 매크로입니다.`);
    }
    return await this.macroRepository.update(id, updateMacroDto);
  }

  async remove(id: number) {
    const macro = this.macroRepository.findOne({
      where: { id },
    });

    if (!macro) {
      throw new UnauthorizedException(`존재하지 않는 매크로입니다.`);
    }

    await this.macroRepository.delete(id);
  }
}
