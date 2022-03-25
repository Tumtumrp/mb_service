import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeAccountEntity } from 'src/entities/type-account.entity';

@Injectable()
export class TypeAccountModel {
  constructor(
    @InjectModel(TypeAccountEntity)
    private typeAccountModel: typeof TypeAccountEntity,
  ) {}

  public async findAll(): Promise<TypeAccountEntity[]> {
    try {
      return await this.typeAccountModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
