import { PartialType } from '@nestjs/mapped-types';
import { CreateSmssDto } from './create-smss.dto';

export class UpdateSmssDto extends PartialType(CreateSmssDto) {}
