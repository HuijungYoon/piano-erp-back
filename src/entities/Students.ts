import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { Teachers } from './Teachers';
import { Lessons } from './Lessons';

@Index('tel', ['tel'], { unique: true })
@Entity({ schema: 'pianoerp', name: 'students' })
export class Students {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: string;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'progress', length: 100 })
  progress: string;

  @Column('int', { name: 'age' })
  age: number;

  @Column('int', { name: 'tutionfee' })
  tutionfee: number;

  @Column('varchar', { name: 'tel', length: 30, unique: true })
  tel: string;

  @ManyToOne(() => Teachers, (teacher) => teacher.students)
  teacher: Teachers;

  @Column('varchar', { name: 'address', length: 100 })
  address: string;

  @Column('text', { name: 'memo' })
  memo: string;

  @Column('date', { name: 'register' })
  register: Date;

  @Column('date', { name: 'closeday' })
  closeday: Date;

  @Column('date', { name: 'paymentdue' })
  paymentdue: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Lessons, (lesson) => lesson.students)
  @JoinTable()
  lessons: Lessons[];
}
