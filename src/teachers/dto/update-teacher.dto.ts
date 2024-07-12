import { PickType, PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Teachers } from 'src/entities/Teachers';

// export class UpdateTeacherDto extends PickType(Teachers, [
//   'teacherId',
//   'name',
//   'tel',
//   'password',
// ] as const) {}
export class UpdateTeacherDto extends PickType(Teachers, [
  'teacherId',
  'name',
  'tel',
] as const) {
  @IsOptional()
  password?: string;
}
