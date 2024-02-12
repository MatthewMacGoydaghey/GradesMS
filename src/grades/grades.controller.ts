import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GradesService } from './grades.service';
import { StudentDTO } from 'src/DTO/student.dto';
import { GradesDTO } from 'src/DTO/grades.dto';

export interface Pagination {
  offset: number,
  limit: number
}

interface Payload {
personalCode: string,
body: GradesDTO
}

@Controller('grades')
export class GradesController {
  constructor(
    private readonly GradesService: GradesService
  ) {}


  @MessagePattern('getGrades')
  getGrades(payload: Pagination) {
  return this.GradesService.getGrades(payload)
  }


  @MessagePattern('getStudentStatistic')
  getStudentStatistic(personalCode: string) {
  return this.GradesService.getStudentStatistic(personalCode)
  }


  @MessagePattern('rateStudent')
  createGrade(@Payload() payload: Payload) {
    const personalCode = payload.personalCode
    const body = payload.body
  return this.GradesService.createGrade(personalCode, body)
  }

}
