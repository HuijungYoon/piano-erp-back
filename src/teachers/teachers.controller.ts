import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Teacher } from 'src/common/decorators/teacher.decorator';
import { Teachers } from 'src/entities/Teachers';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { ApiCookieAuth } from '@nestjs/swagger';

@Controller('api/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    await this.teachersService.create(
      createTeacherDto.teacherId,
      createTeacherDto.password,
      createTeacherDto.name,
      createTeacherDto.tel,
      createTeacherDto.level,
    );
  }

  @UseGuards(LocalAuthGuard) //권한목적
  @Post('login')
  async login(@Teacher() teacher: Teachers) {
    return teacher;
  }

  @ApiCookieAuth('connect.sid')
  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('로그아웃 되셨습니다.');
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teachersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teachersService.remove(id);
  }
}
