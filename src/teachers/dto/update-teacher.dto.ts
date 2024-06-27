import { PickType } from '@nestjs/mapped-types';
import { Teachers } from 'src/entities/Teachers';

export class UpdateTeacherDto extends PickType(Teachers, [
  'teacherId',
  'name',
  'tel',
] as const) {}
