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
} from 'sequelize-typescript';
import { DefaultSandAddress } from 'src/common/enum/default-sand-address.enum';
import { AccountEntity } from './account.entity';

@Table({ tableName: 'addresses', timestamps: true, freezeTableName: true })
export class AddressEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'address_id' })
  addressId: number;

  @ForeignKey(() => AccountEntity)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'account_id' })
  accountId: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(200), field: 'full_name' })
  fullName: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(10), field: 'phone_number' })
  phoneNumber: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING({ length: 150 }), field: 'province' })
  province: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING({ length: 100 }), field: 'district' })
  district: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(5), field: 'zip_code' })
  zipCode: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, field: 'line' })
  line: string;

  @AllowNull(false)
  @Default(DefaultSandAddress.HOME)
  @Column({
    type: DataType.ENUM('WORKPLACE', 'HOME'),
    field: 'default_sand_address',
  })
  defaultSandAddress: DefaultSandAddress;
}
