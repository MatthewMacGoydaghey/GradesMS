import { Table, Model, Column, DataType } from "sequelize-typescript";


@Table({tableName: 'students'})
export class Student extends Model<Student> {
@Column({type: DataType.STRING, unique: true, primaryKey: true})
personalCode: string

@Column({type: DataType.STRING})
name: string

@Column({type: DataType.STRING})
lastName: string
}