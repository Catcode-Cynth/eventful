import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ IMPORTANT: enable Swagger ALWAYS (not just dev)
  const config = new DocumentBuilder()
    .setTitle('Eventful API')
    .setDescription('API documentation for Eventful')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();