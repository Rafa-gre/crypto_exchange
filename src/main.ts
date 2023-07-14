import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Crypto Exchange API')
    .setDescription('Exchange your crypto coins with this powerful API!')
    .setVersion('1.0')
    .addTag('Exchange')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);
  console.log(`swagger: http://localhost:${port}/api-docs`);
}
bootstrap();
