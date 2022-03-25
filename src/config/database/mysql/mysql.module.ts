import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { MySQLConfig } from './mysql.config';
import { MySQLService } from './mysql.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        config: ConfigService,
      ): Promise<SequelizeModuleOptions> => {
        return await MySQLConfig.getMySQLConfigSequelize(config);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MySQLService],
  exports: [MySQLService],
})
export class MySQLModule {}
