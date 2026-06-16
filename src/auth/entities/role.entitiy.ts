import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permisions } from './permision.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @ManyToMany(() => Permisions, { eager: true })
  @JoinTable()
  permisions: Permisions[];
}
