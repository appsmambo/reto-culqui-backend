import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
