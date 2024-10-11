import {
  ConflictException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { appConfig, dbConfig, jwtConfig } from './config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from './middlewares';
import { UploadFileModule } from './modules/file-upload';
import { BookModule } from './modules/books/book.module';
import { BooksModel } from './modules/books/models';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './client';
import { UserModule, UsersModel } from './modules';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 50,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: './uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN, //|| "7567771218:AAEuA4lfPd6Cs6UBJOdoO0Ke_TUPFLKJ1ek",
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get<string>('database.host'),
            port: config.get<number>('database.port'),
            username: config.get<string>('database.username'),
            password: config.get<string>('database.password'),
            database: config.get<string>('database.dbName'),
            synchronize: true,
            autoLoadModels: true,
            models: [BooksModel, UsersModel],
            logging: false,
          };
        } catch (error) {
          throw new ConflictException(
            error.message + ' ;error in app.ts with sequelize',
          );
        }
      },
    }),
    BotModule,
    UploadFileModule,
    BookModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
