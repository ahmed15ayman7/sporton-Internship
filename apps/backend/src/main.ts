import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());
  
  app.enableCors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  });

  // Security
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(bodyParser.json({ limit: '1gb' }));
  app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Sporton API')
    .setDescription('The Sporton API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
  await app.listen(process.env.PORT || 4000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 4000}`,
  );
  console.log(
    `Swagger documentation: http://localhost:${process.env.PORT ?? 4000}/api`,
  );
}
bootstrap();
