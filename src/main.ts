import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Eventful API')
    .setDescription('Event Ticketing Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Eventful API is running on: http://localhost:3000');
  console.log('📚 Swagger Docs: http://localhost:3000/api/docs');
}
bootstrap();