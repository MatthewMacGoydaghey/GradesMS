import { BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "./student.model";



@Table({tableName: 'grades', updatedAt: false, createdAt: false})
export class Grade extends Model<Grade> {

@Column({type: DataType.DATE})
date: Date

@Column({type: DataType.INTEGER})
grade: number

@Column({type: DataType.STRING})
subject: string

@ForeignKey(() => Student)
personalCode: string


@BelongsTo(() => Student)
student: Student
}