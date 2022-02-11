import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  tid: number;

  @Column()
  content: string;
}
