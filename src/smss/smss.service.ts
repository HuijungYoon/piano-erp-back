import { Injectable } from '@nestjs/common';
import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';

@Injectable()
export class SmssService {
  create(createSmssDto: CreateSmssDto) {
    return 'This action adds a new smss';
  }

  findAll() {
    return `This action returns all smss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smss`;
  }

  update(id: number, updateSmssDto: UpdateSmssDto) {
    return `This action updates a #${id} smss`;
  }

  remove(id: number) {
    return `This action removes a #${id} smss`;
  }
}
