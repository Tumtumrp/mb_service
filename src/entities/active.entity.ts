import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'active', timestamps: true, freezeTableName: true })
export class ActiveEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER({ length: 10 }), field: 'active_id' })
  activeId: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING({ length: 50 }), field: 'active_name' })
  activeName: string;
}