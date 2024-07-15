import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';

import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { Teacher } from 'src/common/decorators/teacher.decorator';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    await this.studentsService.create(
      createStudentDto.name,
      createStudentDto.progress,
      createStudentDto.paymentdue,
      createStudentDto.age,
      createStudentDto.tutionfee,
      createStudentDto.tel,
      createStudentDto.teacher,
      createStudentDto.address,
      createStudentDto.memo,
      createStudentDto.register,
      createStudentDto.closeday,
    );
  }

  @Get('search')
  search(
    @Query('teacherId') teacherId?: string,
    @Query('studentName') studentName?: string,
    @Query('status') status?: string,
    @Teacher() teacher?: any,
  ) {
    return this.studentsService.search(teacherId, studentName, status, teacher);
  }

  @Get()
  findAll(@Teacher() teacher?: any) {
    return this.studentsService.findAll(teacher);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
