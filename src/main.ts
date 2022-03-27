import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Swagger } from './config/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('port');

  app.use(helmet());
  if (config.get<string>('NODE_ENV') === 'production') {
    const whitelist: string[] = config.get<string>('origin').split(',');
    app.enableCors({
      origin: (origin, cb) => {
        if (whitelist.indexOf(origin) !== -1) {
          logger.log(`allowed cors for: ${origin}`);
          cb(null, true);
        } else {
          logger.error(`blocked cors for: ${origin}`);
          cb(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      optionsSuccessStatus: 200,
    });
  } else {
    app.enableCors();
  }

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: false,
    }),
  );
  Swagger.run(app);
  await app.listen(port);
  logger.log(`application server running on port ${port}`);
}
bootstrap();
