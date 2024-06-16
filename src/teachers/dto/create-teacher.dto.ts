import { PickType } from '@nestjs/swagger';
import { Teachers } from 'src/entities/Teachers';

export class CreateTeacherDto extends PickType(Teachers, [
  'teacherId',
  'password',
  'name',
  'tel',
  'level',
] as const) {}
