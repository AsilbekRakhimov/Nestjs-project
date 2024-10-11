import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // if (process.env?.NODE_ENV == 'development') {
  //   app.use(morgan('tiny'));
  // }

  const config = new DocumentBuilder()
    .setTitle('Bot bilan ulab ishlatish')
    .setDescription('CRUD on users and books')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow<number>('appConfig.port'), () => {
    console.log(
      `Server is running on port: ${configService.getOrThrow<number>('appConfig.port')}`,
    );
  });
}
bootstrap();
