import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLModule } from './config/database/mysql/mysql.module';
import { configuration } from './config/env/configuration';
import { validationSchema } from './config/env/validation-schema';
import { AuthModule } from './module/auth.module';
import { ActiveModule } from './module/active.module';
import { TypeAccountModule } from './module/type-account.module';
import { AccountModule } from './module/account.module';

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
    AuthModule,
    TypeAccountModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
