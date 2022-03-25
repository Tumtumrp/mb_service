import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeAccountController } from 'src/controller/type-account.controller';
import { TypeAccountEntity } from 'src/entities/type-account.entity';
import { TypeAccountModel } from 'src/model/typ-account.model';
import { TypeAccountService } from 'src/service/type-account.service';

@Module({
  imports: [SequelizeModule.forFeature([TypeAccountEntity])],
  controllers: [TypeAccountController],
  providers: [TypeAccountModel, TypeAccountService],
  exports: [SequelizeModule],
})
export class TypeAccountModule {}
