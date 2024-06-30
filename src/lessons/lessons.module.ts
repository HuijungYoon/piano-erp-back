import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lessons } from 'src/entities/Lessons';
import { Students } from 'src/entities/Students';

@Module({
  imports: [TypeOrmModule.forFeature([Lessons, Students])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
