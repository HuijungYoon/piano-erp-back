import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lessons } from 'src/entities/Lessons';
import { Students } from 'src/entities/Students';
import { Teachers } from 'src/entities/Teachers';

@Module({
  imports: [TypeOrmModule.forFeature([Lessons, Students, Teachers])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
