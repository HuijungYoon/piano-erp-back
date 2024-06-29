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
  OneToMany,
} from 'typeorm';
import { Teachers } from './Teachers';
import { Lessons } from './Lessons';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

@Index('tel', ['tel'], { unique: true })
@Entity({ schema: 'pianoerp', name: 'students' })
export class Students {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'paymentdue', length: 30 })
  paymentdue: string;

  @IsString()
  @IsOptional()
  @Column('varchar', { name: 'progress', length: 100 })
  progress?: string;

  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'age' })
  age: number;

  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'tutionfee' })
  tutionfee: number;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'tel', length: 30, unique: true })
  tel: string;

  @ManyToOne(() => Teachers, (teacher) => teacher.students)
  teacher: Teachers;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'address', length: 100 })
  address: string;

  @IsString()
  @IsOptional()
  @Column('text', { name: 'memo' })
  memo?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Column('datetime', { name: 'register', nullable: false })
  register: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Column('datetime', { name: 'closeday', nullable: true })
  closeday?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Lessons, (lesson) => lesson.students)
  @JoinTable()
  lessons: Lessons[];
}
