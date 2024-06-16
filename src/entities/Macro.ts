import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Macro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  formate: string;
}
