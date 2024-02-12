import { IsString } from "@nestjs/class-validator";



export class StudentDTO {
@IsString()
personalCode: string

@IsString()
name: string

@IsString()
lastName: string
}