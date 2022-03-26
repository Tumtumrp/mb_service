import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountController } from 'src/controller/account.controller';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountModel } from 'src/model/account.model';
import { AccountService } from 'src/service/account.service';

@Module({
  imports: [SequelizeModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [AccountModel, AccountService],
  exports: [SequelizeModule],
})
export class AccountModule {}
