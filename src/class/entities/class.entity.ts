import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn({ name: 'class_id' })
  id: number;

  @Column({ type: 'varchar', name: 'class_title' })
  title: string;

  @ManyToMany(() => Student, student => student.classes)
  students: Student[];
}
