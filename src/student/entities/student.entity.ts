import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Class } from 'src/class/entities/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn({ name: 'student_id' })
  id: number;

  @Column({ type: 'varchar', name: 'student_name' })
  name: string;

  @Column({ type: 'varchar', name: 'address' })
  address: string;

  @ManyToMany(() => Class, classEntity => classEntity.students)
  @JoinTable({
    name: 'student_classes',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
  })
  classes: Class[];
}
