import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import { ResponseSerializerInterceptor } from './common/interceptors/response-serializer.interceptor';
import { MapperInterceptor } from './common/interceptors/mapper.interceptor.ts';
import { ConfigService } from '@nestjs/config';
import * as ConnectPgSimple from 'connect-pg-simple';
import { router } from 'bull-board';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SocketIoSessionRedisPassportAdapter } from './common/adapters/socket-io-passport.adapter';
import { I18nService } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  });

  // todo remove bull-board
  app.use('/admin/queues', router);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, stopAtFirstError: true }));

  initCookieParser(app);
  const sessionMiddleware = initSession(app);
  initPassport(app);
  initGlobalInterceptors(app);
  initGlobalFilters(app);
  initSwagger(app);
  initWinston(app);
  initWsAdapter(app, sessionMiddleware);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('appPort'));
}

function initCookieParser(app: INestApplication) {
  app.use(cookieParser());
}

function initSession(app: INestApplication) {
  const configService = app.get(ConfigService);
  const sessionCookieName = configService.get('sessionCookieName');
  const sessionSecret = configService.get('sessionSecret');
  const dbConfig = configService.get('database');

  const PgStore = ConnectPgSimple(expressSession);
  const store = new PgStore({
    tableName: 'sessions',
    conString: `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
  });

  const sessionMiddleware = expressSession({
    store,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800 * 1000 * 1000,
    },
    name: sessionCookieName,
  });

  app.use(sessionMiddleware);

  return sessionMiddleware;
}

function initPassport(app: INestApplication) {
  app.use(passport.initialize());
  app.use(passport.session());
}

function initGlobalInterceptors(app: INestApplication) {
  app.useGlobalInterceptors(new ResponseSerializerInterceptor(), new MapperInterceptor());
}

function initGlobalFilters(app: INestApplication) {
  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  const i18nService = app.get(I18nService);

  app.useGlobalFilters(new AllExceptionFilter(loggerService), new DomainExceptionFilter(loggerService, i18nService));
}

function initSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const sessionCookieName = configService.get('sessionCookieName');
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Pot-back-nest')
    .addCookieAuth(sessionCookieName)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, swaggerDocument);
}

function initWinston(app: INestApplication) {
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}

function initWsAdapter(app: INestApplication, sessionMiddleware) {
  app.useWebSocketAdapter(new SocketIoSessionRedisPassportAdapter(app, sessionMiddleware, passport));
}

bootstrap();
