import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressController } from 'src/controller/address.controller';
import { AddressEntity } from 'src/entities/address.entity';
import { AddressModel } from 'src/model/address.model';
import { AddressService } from 'src/service/address.service';

@Module({
  imports: [SequelizeModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [AddressModel, AddressService],
  exports: [SequelizeModule],
})
export class AddressModule {}
