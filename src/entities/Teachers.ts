import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Students } from './Students';

@Index('tel', ['tel'], { unique: true })
@Index('teacherId', ['teacherId'], { unique: true })
@Index('name', ['name'], { unique: true })
@Entity({ schema: 'pianoerp', name: 'teachers' })
export class Teachers {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: string;

  @Column('varchar', { name: 'teacherId', unique: true, length: 100 })
  teacherId: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column('varchar', { name: 'name', length: 30, unique: true })
  name: string;

  @Column('varchar', { name: 'tel', length: 30, unique: true })
  tel: string;

  @Column('enum', {
    name: 'level',
    enum: ['admin', 'teacher', 'assistant'],
    default: 'teacher',
  })
  level: 'admin' | 'teacher' | 'assistant';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Students, (student) => student.teacher)
  students: Students[];
}
