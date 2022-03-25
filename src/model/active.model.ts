import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActiveEntity } from 'src/entities/Active.entity';

@Injectable()
export class ActiveModel {
  constructor(
    @InjectModel(ActiveEntity) private activeModel: typeof ActiveEntity,
  ) {}

  public async findAll(): Promise<ActiveEntity[]> {
    try {
      return await this.activeModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
