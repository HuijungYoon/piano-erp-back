import { PickType } from '@nestjs/mapped-types';
import { Macros } from 'src/entities/Macros';

export class CreateMacroDto extends PickType(Macros, [
  'id',
  'name',
  'format',
]) {}
