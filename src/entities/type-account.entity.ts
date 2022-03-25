import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { AccountEntity } from './account.entity';

@Table({ tableName: 'types_account', timestamps: true, freezeTableName: true })
export class TypeAccountEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'type_account_id' })
  typeAccountId: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING({ length: 50 }), field: 'type_account_name' })
  typeAccountName: string;

  @HasOne(() => AccountEntity)
  account: AccountEntity;
}
