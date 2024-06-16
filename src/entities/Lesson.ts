import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  memo: string;

  @Column('timestamp')
  lessontime: Date;

  @Column('date')
  lessondate: Date;

  @ManyToMany(() => Student, (student) => student.lessons)
  students: Student[];
}
