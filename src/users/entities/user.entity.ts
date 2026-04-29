import UsersRoleEnum from 'enums/usersRoleEnums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mobile: string;

  @Column() //making mobile column uniqe
  password: string;

  @Column({ nullable: false })
  display_name: string;

  @Column({ type: 'enum', enum: UsersRoleEnum, default: UsersRoleEnum.User })
  role: UsersRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
