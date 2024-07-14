import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Teachers } from '../entities/Teachers';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Teachers]),
  ],

  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
