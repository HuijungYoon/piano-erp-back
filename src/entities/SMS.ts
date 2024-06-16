import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SMS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tel: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('timestamp')
  sendtime: Date;
}
