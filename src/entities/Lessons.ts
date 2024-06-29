import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Students } from './Students';
import { Teachers } from './Teachers';

@Entity({ schema: 'pianoerp', name: 'lessons' })
export class Lessons {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'teacher', length: 30 })
  teacher: string;

  @Column('text', { name: 'memo' })
  memo: string;

  @Column('timestamp', { name: 'lessontime' })
  lessontime: Date;

  @Column('date', { name: 'lessondate' })
  lessondate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Students, (student) => student.lessons)
  students: Students[];

  @ManyToOne(() => Teachers, (teacher) => teacher.lessons)
  teachers: Teachers[];
}
