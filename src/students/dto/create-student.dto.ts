import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Students } from 'src/entities/Students';

export class CreateStudentDto extends PickType(Students, [
  'id',
  'name',
  'progress',
  'age',
  'tutionfee',
  'tel',
  'address',
  'memo',
  'register',
  'closeday',
  'paymentdue',
] as const) {
  @IsString()
  @IsNotEmpty()
  teacher: string;
}
