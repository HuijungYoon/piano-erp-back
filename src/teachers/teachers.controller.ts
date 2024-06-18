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

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
