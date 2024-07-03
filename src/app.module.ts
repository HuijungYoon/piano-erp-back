import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { TeachersController } from './teachers/teachers.controller';
import { TeachersService } from './teachers/teachers.service';
import { MacrosController } from './macros/macros.controller';
import { MacrosService } from './macros/macros.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Macros } from './entities/Macros';
import { SMSs } from './entities/SMSs';
import { Teachers } from './entities/Teachers';
import { LessonsModule } from './lessons/lessons.module';
import { SmssModule } from './smss/smss.module';
import { Lessons } from './entities/Lessons';
import { Students } from './entities/Students';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';
import { MacrosModule } from './macros/macros.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Lessons, Macros, SMSs, Teachers, Students],
      synchronize: false, // 최초 한번만 true로 설정하고, 이후에는 false로 설정해야 함
      keepConnectionAlive: true,
      charset: 'utf8mb4',
      logging: true,
    }),
    TypeOrmModule.forFeature([Teachers]),
    LessonsModule,
    SmssModule,
    StudentsModule,
    TeachersModule,
    AuthModule,
    MacrosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    console.log('AppModule configure()');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
