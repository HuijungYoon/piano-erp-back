import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ schema: 'pianoerp', name: 'smss' })
export class SMSs {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'tel', length: 30 })
  tel: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('enum', {
    name: 'smstype',
    enum: ['SMS', 'LMS'],
    default: 'SMS',
  })
  smstype: 'SMS' | 'LMS';
  @Column('enum', {
    name: 'status',
    enum: ['success', 'fail'],
    default: 'success',
  })
  status: 'success' | 'fail';

  @Column('timestamp', { name: 'sendtime' })
  sendtime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
