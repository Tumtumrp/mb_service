import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenModel {
  constructor(
    @InjectModel(RefreshTokenEntity)
    private refreshTokenModel: typeof RefreshTokenEntity,
  ) {}

  public async create(accountId: number): Promise<RefreshTokenEntity> {
    try {
      return await this.refreshTokenModel.create({ accountId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async updateByAccountId(
    accountId: number,
    refreshTokenHash: string,
  ): Promise<boolean> {
    try {
      const [affectedCount] = await this.refreshTokenModel.update(
        { refreshTokenHash },
        { where: { account_id: accountId } },
      );

      if (affectedCount) return true;

      return false;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
