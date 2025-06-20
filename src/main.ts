import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilita CORS para qualquer origem (desenvolvimento)
  app.enableCors({
    origin: 'http://localhost:3001', // Porta do seu front-end
    credentials: true, // se você usar cookies, auth, etc.
  });

  // ✅ Pipes globais (continua como você já tinha feito)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
