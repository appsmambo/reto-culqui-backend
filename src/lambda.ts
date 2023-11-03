import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.enableCors();
    nestApp.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true, // Si se envía un parámetro que no está definido en el DTO, se rechaza la petición
        whitelist: true, // Si se envía un parámetro que no está definido en el DTO, se ignora
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('Prueba Técnica Culqui')
      .setDescription('API: Tokenización de Tarjetas')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api', nestApp, document);

    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
