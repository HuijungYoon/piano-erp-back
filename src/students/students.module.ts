import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/entities/Students';
import { Teachers } from 'src/entities/Teachers';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Teachers])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
