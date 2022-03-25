import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Swagger } from './config/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('port');

  app.setGlobalPrefix('/api/v1');
  Swagger.run(app);
  await app.listen(port);
  logger.log(`application server running on port ${port}`);
}
bootstrap();
