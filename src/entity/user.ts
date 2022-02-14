import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  openid: string;

  @Column()
  admin: boolean;
}
