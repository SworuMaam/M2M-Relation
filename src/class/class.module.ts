import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Student])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
