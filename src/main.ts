import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
    
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    parseInt(process.env.PORT) || 3000, 
    process.env.HOST || 'localhost'
  );
}
bootstrap();
