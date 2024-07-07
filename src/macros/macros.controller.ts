import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MacrosService } from './macros.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import { UpdateMacroDto } from './dto/update-macro.dto';

@Controller('api/macros')
export class MacrosController {
  constructor(private readonly macrosService: MacrosService) {}

  @Post()
  async create(@Body() createMacroDto: CreateMacroDto) {
    return await this.macrosService.create(
      createMacroDto.name,
      createMacroDto.format,
    );
  }

  @Get()
  async findAll() {
    return await this.macrosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.macrosService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMacroDto: UpdateMacroDto,
  ) {
    return await this.macrosService.update(+id, updateMacroDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.macrosService.remove(+id);
  }
}
