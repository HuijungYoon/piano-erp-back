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

  @ApiCookieAuth('dosi_piano_secret_key')
  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    // console.log('req.user', req.user);
    // console.log('logout', res);

    if (!req.user) {
      // 세션이 만료되었거나 유효하지 않은 경우
      return res.status(403).send('세션이 만료되었거나 유효하지 않습니다.');
    }

    res.clearCookie('dosi_piano_secret_key', {
      httpOnly: true,
      domain:
        process.env.NODE_ENV === 'production' ? '.dosipiano.com' : undefined,
      path: '/',
    });
    return res.send('로그아웃 되었습니다.');
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
