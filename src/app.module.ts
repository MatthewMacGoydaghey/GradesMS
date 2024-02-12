import { Module } from '@nestjs/common';
import { GradesModule } from './grades/grades.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './DTO/grade.model';
import { Student } from './DTO/student.model';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'DB',
    models: [Student, Grade],
    autoLoadModels: true
  }), GradesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
