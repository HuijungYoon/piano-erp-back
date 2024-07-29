import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SmssService } from './smss.service';
import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
import { SendSmssDto } from './dto/send-smss.dto';

@Controller('api/smss')
export class SmssController {
  constructor(private readonly smssService: SmssService) {}

  @Post('send')
  async sendSMS(@Body() sendSmssDTo: SendSmssDto) {
    return await this.smssService.sendSMS(sendSmssDTo);
  }

  @Post()
  create(@Body() createSmssDto: CreateSmssDto) {
    return this.smssService.create(createSmssDto);
  }

  @Get()
  findAll() {
    return this.smssService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smssService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmssDto: UpdateSmssDto) {
    return this.smssService.update(+id, updateSmssDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smssService.remove(+id);
  }
}
