import { Module } from '@nestjs/common';
import { SmssService } from './smss.service';
import { SmssController } from './smss.controller';

@Module({
  controllers: [SmssController],
  providers: [SmssService],
})
export class SmssModule {}
