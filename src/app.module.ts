import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/env/configuration';
import { validationSchema } from './config/env/validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}\\src\\resource\\.${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
