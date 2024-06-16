import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Teacher {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  tel: string;

  @Column('int')
  level: number;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];
}
