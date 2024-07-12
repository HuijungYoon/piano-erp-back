import { Module } from '@nestjs/common';
import { SmssService } from './smss.service';
import { SmssController } from './smss.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/entities/Students';
import { SMSs } from 'src/entities/SMSs';

@Module({
  imports: [TypeOrmModule.forFeature([Students, SMSs])],
  controllers: [SmssController],
  providers: [SmssService],
})
export class SmssModule {}
