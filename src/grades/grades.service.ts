import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundError } from 'rxjs';
import { Grade } from 'src/DTO/grade.model';
import { GradesDTO, subjects } from 'src/DTO/grades.dto';
import { StudentDTO } from 'src/DTO/student.dto';
import { Student } from 'src/DTO/student.model';
import { Pagination } from './grades.controller';
import sequelize, { col, where } from 'sequelize';

export interface StudentStatistic {
student: StudentDTO,
statistic: object[]
}


@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade)
  private gradeModel: typeof Grade,
  @Inject('STUDENTS_SERVICE') private StudentsClient: ClientProxy
  ) {}


  async getGrades(pagination: Pagination) {
   const grades = await this.gradeModel.findAll({include: Student, offset: pagination.offset, limit: pagination.limit, order: [
    ["date", 'DESC']
  ]})
  let result = []
  for (let grade of grades) {
    delete grade.dataValues['personalCode']
    delete grade.dataValues['id']
    result.push(grade)
  }
   return result
  }


  async getStudentStatistic(personalCode: string) {
    let foundStudent: StudentDTO
    await this.StudentsClient.send('getStudent', personalCode).forEach((val) => foundStudent = val)
    if (!foundStudent) {
      return null
    }
    
    let grades = await this.gradeModel.findAll({
      where: {"personalCode": foundStudent.personalCode},
      attributes: [
        ['subject', 'subject'],
        [sequelize.fn('MAX', sequelize.col('grade')), 'maxGrade'],
        [sequelize.fn('MIN', sequelize.col('grade')), 'minGrade'],
        [sequelize.fn('AVG', sequelize.col('grade')), 'avgGrade'],
        [sequelize.fn('COUNT', sequelize.col('grade')), 'totalGrades']
      ],
      group: ['subject']
    })

    let subjectsStatistic = []
    for (let grade of grades) {
      let obj = grade.dataValues as any
      obj.avgGrade = obj.avgGrade.slice(0, 4)
      subjectsStatistic.push(obj)
    }

  let result:StudentStatistic = {
   student: foundStudent,
   statistic: subjectsStatistic
  }
    return result
  }


async createGrade(personalCode: string, body: GradesDTO) {
  try {
    let foundStudent: StudentDTO
await this.StudentsClient.send('getStudent', personalCode).forEach((val) => foundStudent = val)
if (!foundStudent) {
  return null
}
const grade = {
  date: new Date(),
  personalCode: personalCode,
  grade: body.grade,
  subject: body.subject
}
return this.gradeModel.create(grade)
  } catch (error) {
    console.log(error)
    return error
  }

}

}
