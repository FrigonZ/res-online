import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  did: number;

  @Column({
    type: 'double',
  })
  standard: number;

  @Column({
    type: 'double',
  })
  discount: number;
}
