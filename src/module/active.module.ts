import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActiveController } from 'src/controller/active.controller';
import { ActiveEntity } from 'src/entities/Active.entity';
import { ActiveModel } from 'src/model/active.model';
import { ActiveService } from 'src/service/active.service';

@Module({
  imports: [SequelizeModule.forFeature([ActiveEntity])],
  controllers: [ActiveController],
  providers: [ActiveModel, ActiveService],
  exports: [SequelizeModule],
})
export class ActiveModule {}
