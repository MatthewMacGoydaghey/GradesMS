import { Module } from '@nestjs/common';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from 'src/DTO/grade.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [SequelizeModule.forFeature([Grade]),
   ClientsModule.register([{
    name: 'STUDENTS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://fzxkocmz:B0ihang6Z6_lxMwy8-kZFsyfXVKLKkrN@jackal.rmq.cloudamqp.com/fzxkocmz'],
      queue: 'students_queue',
      queueOptions: {
        durable: false
      },
  }}])],
  controllers: [GradesController],
  providers: [GradesService]
})
export class GradesModule {}
