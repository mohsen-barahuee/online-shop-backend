import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.address)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
