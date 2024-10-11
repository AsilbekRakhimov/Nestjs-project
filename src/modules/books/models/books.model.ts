import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'books', timestamps: true })
export class BooksModel extends Model<BooksModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
  })
  author: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
  })
  count: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
  })
  cost: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
  })
  image?: any;
}
