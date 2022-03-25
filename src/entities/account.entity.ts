import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ActiveEntity } from './Active.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { TypeAccountEntity } from './type-account.entity';

@Table({ tableName: 'accounts', timestamps: true, freezeTableName: true })
export class AccountEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'account_id' })
  accountId: number;

  @ForeignKey(() => ActiveEntity)
  @AllowNull(false)
  @Default(1)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'active_id' })
  activeId: number;

  @ForeignKey(() => TypeAccountEntity)
  @AllowNull(false)
  @Default(2)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'type_account_id' })
  typeAccountId: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING({ length: 100 }), field: 'username' })
  username: string;

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column({ type: DataType.STRING({ length: 200 }), field: 'email' })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, field: 'password' })
  password: string;

  @HasOne(() => RefreshTokenEntity)
  refreshToken: RefreshTokenEntity;
}
