import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './loadEnv';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { parse } from 'yaml';
// import { Logger } from './log/log.service';

const PORT = parseInt(process.env.PORT || '4000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useLogger(app.get(Logger));

  const api = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const doc: OpenAPIObject = parse(api);
  SwaggerModule.setup('doc', app, doc);
  await app.listen(PORT);
}
bootstrap();
