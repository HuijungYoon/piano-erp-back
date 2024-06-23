import { PickType } from '@nestjs/mapped-types';
import { Students } from 'src/entities/Students';

export class CreateStudentDto extends PickType(Students, [
  'id',
  'name',
  'progress',
  'age',
  'tutionfee',
  'tel',
  'teacher',
  'address',
  'memo',
  'register',
  'closeday',
  'paymentdue',
] as const) {}
