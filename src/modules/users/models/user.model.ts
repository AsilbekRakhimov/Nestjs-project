import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'readers', timestamps: true })
export class UsersModel extends Model<UsersModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    unique: false,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    unique: false,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: 'user',
  })
  role: string;
}
