import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('dosiPianoERP API')
    .setDescription('dosiPianoERP 개발을 위한 API 문서입니다')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  app.use(cookieParser('dosi_piano_secret_key'));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production' ? true : false, // https를 사용하지 않을 때는 false
        domain:
          process.env.NODE_ENV === 'production' ? '.dosipiano.com' : undefined,
        // maxAge : 6000 //
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3002',
      'https://dosipiano-g5ny7eqoz-huijungyoons-projects.vercel.app/auth/login',
      'https://dosipiano-erp.vercel.app',
      'https://erp.dosipiano.com',
      'erp.dosipiano.com',
    ], // 허용할 도메인 배열
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(passport.initialize());
  app.use(passport.session());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port);
  console.log(`Server is running on ${port}`);
}

bootstrap();
