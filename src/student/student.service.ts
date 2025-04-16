import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Class } from '../class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}



  async findAll() {
    try {
      const allStudents = await this.studentRepo
        .createQueryBuilder("student")
        .leftJoinAndSelect("student.class", "class")
        .getMany();
      return allStudents;
    } catch (error) {
      throw new HttpException(
        `Error finding services : ${error}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async create(name: string, address: string): Promise<Student> {
    const student = this.studentRepo.create({ name, address });
    return this.studentRepo.save(student);
  }

  async assignClasses(studentId: number, classIds: number[]): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
      relations: ['classes'],
    });
    if (!student) throw new NotFoundException('Student not found');

    const classes = await this.classRepo.findByIds(classIds);
    student.classes = classes;

    return this.studentRepo.save(student);
  }

  // async findOne(id: number): Promise<Student> {
  //   const student = await this.studentRepo.findOne({
  //     where: { id },
  //     relations: ['classes'],
  //   });
  //   if (!student) throw new NotFoundException('Student not found');
  //   return student;
  // }
}
