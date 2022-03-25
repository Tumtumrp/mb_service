import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLModule } from './config/database/mysql/mysql.module';
import { configuration } from './config/env/configuration';
import { validationSchema } from './config/env/validation-schema';
import { ActiveModule } from './module/active.module';
import { TypeAccountModule } from './module/type-account.module';

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
    MySQLModule,
    ActiveModule,
    TypeAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
