import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasicStrategy } from 'src/auth/strategies/basic.strategy';
import { AuthController } from 'src/controller/auth.controller';
import { AccountEntity } from 'src/entities/account.entity';
import { AuthService } from 'src/service/auth.service';
import { BcryptModule } from 'src/utils/bcrypt/bcrypt.module';
import { AccountModel } from '../model/account.model';

@Module({
  imports: [SequelizeModule.forFeature([AccountEntity]), BcryptModule],
  controllers: [AuthController],
  providers: [AccountModel, AuthService, BasicStrategy],
  exports: [SequelizeModule],
})
export class AuthModule {}
