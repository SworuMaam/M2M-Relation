import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAllStudents() {
    return this.studentService.findAll();
  }

  // @Get(':id')
  // getStudent(@Param('id') id: string) {
  //   return this.studentService.findOne(+id);
  // }

  @Post()
  createStudent(@Body() body: { name: string; address: string }) {
    return this.studentService.create(body.name, body.address);
  }

  @Post(':id/classes')
  assignClasses(
    @Param('id') id: string,
    @Body() body: { classIds: number[] },
  ) {
    return this.studentService.assignClasses(+id, body.classIds);
  }
}
