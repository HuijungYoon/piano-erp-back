import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/entities/Students';
import { Teachers } from 'src/entities/Teachers';
import { Lessons } from 'src/entities/Lessons';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Teachers, Lessons])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
