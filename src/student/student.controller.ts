import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':id')
  getStudent(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Post(':id/classes')
  assignClasses(
    @Param('id') id: string,
    @Body() body: { classIds: number[] },
  ) {
    return this.studentService.assignClasses(+id, body.classIds);
  }
}
