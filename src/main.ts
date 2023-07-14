import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Crypto Exchange API')
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .addTag('Exchange')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: '/api-json',
    yamlDocumentUrl: '/api-yaml',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      displayOperationId: false,
    },
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);
  console.log(`swagger: http://localhost:${port}/api-docs`);
}
bootstrap();
