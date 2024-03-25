import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './loadEnv';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { parse } from 'yaml';

const PORT = parseInt(process.env.PORT || '4000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const api = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const doc: OpenAPIObject = parse(api);
  SwaggerModule.setup('doc', app, doc);
  await app.listen(PORT);
}
bootstrap();
