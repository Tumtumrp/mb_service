import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { AccountEntity } from 'src/entities/account.entity';
import { ActiveEntity } from 'src/entities/Active.entity';
import { AddressEntity } from 'src/entities/address.entity';
import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';
import { TypeAccountEntity } from 'src/entities/type-account.entity';

export class MySQLConfig {
  public static async getMySQLConfigSequelize(
    config: ConfigService,
  ): Promise<SequelizeModuleOptions> {
    return new Promise((resolve) => {
      return resolve({
        dialect: 'mysql',
        host: config.get<string>('db_host'),
        port: config.get<number>('db_port'),
        username: config.get<string>('db_username'),
        password: config.get<string>('db_password'),
        database: config.get<string>('db_name'),
        models: [
          ActiveEntity,
          TypeAccountEntity,
          AccountEntity,
          RefreshTokenEntity,
          AddressEntity,
        ],
        autoLoadModels: true,
        synchronize: true,
        logging:
          config.get<string>('NODE_ENV') === 'development' ? true : false,
        logQueryParameters:
          config.get<string>('NODE_ENV') === 'development' ? true : false,
      });
    });
  }
}
