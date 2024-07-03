import { Module } from '@nestjs/common';
import { MacrosService } from './macros.service';
import { MacrosController } from './macros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Macros } from 'src/entities/Macros';

@Module({
  imports: [TypeOrmModule.forFeature([Macros])],
  controllers: [MacrosController],
  providers: [MacrosService],
})
export class MacrosModule {}
