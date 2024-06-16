import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Teacher } from './Teacher';
import { Lesson } from './Lesson';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  key: number;

  @Column()
  name: string;

  @Column()
  progress: string;

  @Column('int')
  age: number;

  @Column('int')
  tutionfee: number;

  @Column()
  tel: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher;

  @Column()
  address: string;

  @Column()
  memo: string;

  @Column('date')
  register: Date;

  @Column('date')
  closeday: Date;

  @Column('date')
  paymentdue: Date;

  @ManyToMany(() => Lesson, (lesson) => lesson.students)
  @JoinTable()
  lessons: Lesson[];
}
