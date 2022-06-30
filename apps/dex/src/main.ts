import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { DexModule } from './dex.module';

async function bootstrap() {
  config();

  const app = await NestFactory.create(DexModule);
  const PORT = process.env.HTTP_PORT;
  await app.listen(PORT, () => console.log('DEX Graph listening on: ' + PORT));
}

bootstrap();
