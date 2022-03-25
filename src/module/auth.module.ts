import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasicStrategy } from 'src/auth/strategies/basic.strategy';
import { AuthController } from 'src/controller/auth.controller';
import { AccountEntity } from 'src/entities/account.entity';
import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';
import { RefreshTokenModel } from 'src/model/refresh-token.model';
import { AuthService } from 'src/service/auth.service';
import { BcryptModule } from 'src/utils/bcrypt/bcrypt.module';
import { AccountModel } from '../model/account.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AccountEntity, RefreshTokenEntity]),
    PassportModule,
    JwtModule.register({}),
    BcryptModule,
  ],
  controllers: [AuthController],
  providers: [AccountModel, RefreshTokenModel, AuthService, BasicStrategy],
  exports: [SequelizeModule],
})
export class AuthModule {}
