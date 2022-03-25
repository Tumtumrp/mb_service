import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { AccountEntity } from './account.entity';

@Table({ tableName: 'refresh_token', timestamps: true, freezeTableName: true })
export class RefreshTokenEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'refresh_token_id' })
  refreshTokenId: number;

  @ForeignKey(() => AccountEntity)
  @Unique
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'account_id' })
  accountId: number;

  @AllowNull(true)
  @Default(null)
  @Column({ type: DataType.TEXT, field: 'refresh_token_hash' })
  refreshTOkenHash: string;
}
