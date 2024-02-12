import { IsEnum, IsNumber, IsString } from "@nestjs/class-validator";
type grades = [1, 2, 3, 4, 5]
type subjects = ['Math', 'Physics', 'Russian language', 'History']
export const subjects = ['Math', 'Physics', 'Russian language', 'History']


export class GradesDTO {

  @IsEnum([1, 2, 3, 4, 5])
  grade: number

  @IsEnum(['Math', 'Physics', 'Russian language', 'History'])
  subject: string
}