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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Teacher } from 'src/common/decorators/teacher.decorator';

@Controller('api/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(
      createLessonDto.name,
      createLessonDto.teacher,
      createLessonDto.lessontime,
      createLessonDto.lessondate,
      createLessonDto.memo,
    );
  }

  @Get('search')
  search(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('teacherId') teacherId?: string,
    @Query('studentName') studentName?: string,
    @Teacher() teacher?: any,
  ) {
    return this.lessonsService.search(
      startDate,
      endDate,
      teacherId,
      studentName,
      teacher,
    );
  }

  @Get()
  findAll(@Teacher() teacher?: any) {
    return this.lessonsService.findAll(teacher);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
