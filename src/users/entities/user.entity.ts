import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @Column()
  user_company_id: number;

  @Column({ default: false })
  user_status: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}