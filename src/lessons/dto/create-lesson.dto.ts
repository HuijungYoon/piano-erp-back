import { PickType } from '@nestjs/mapped-types';
import { Lessons } from 'src/entities/Lessons';

export class CreateLessonDto extends PickType(Lessons, [
  'id',
  'name',
  'teacher',
  'memo',
  'lessontime',
  'lessondate',
] as const) {}
