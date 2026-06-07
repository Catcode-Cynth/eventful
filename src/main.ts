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

  // Important for Render / Cloud deployment
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Eventful API is running on port: ${port}`);
  console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
}
bootstrap();