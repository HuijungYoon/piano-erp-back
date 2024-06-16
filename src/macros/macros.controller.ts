import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MacrosService } from './macros.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import { UpdateMacroDto } from './dto/update-macro.dto';

@Controller('macros')
export class MacrosController {
  constructor(private readonly macrosService: MacrosService) {}

  @Post()
  create(@Body() createMacroDto: CreateMacroDto) {
    return this.macrosService.create(createMacroDto);
  }

  @Get()
  findAll() {
    return this.macrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.macrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMacroDto: UpdateMacroDto) {
    return this.macrosService.update(+id, updateMacroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.macrosService.remove(+id);
  }
}
