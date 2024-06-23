import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create-teacher.dto';
import { Teachers } from 'src/entities/Teachers';

export class UpdateTeacherDto extends PickType(Teachers, [
  'teacherId',
  'name',
  'tel',
] as const) {}
