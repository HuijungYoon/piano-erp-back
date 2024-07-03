import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'pianoerp', name: 'macros' })
export class Macros {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { name: 'name', length: 30, unique: true })
  name: string;

  @Column('text', { name: 'content' })
  format: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
