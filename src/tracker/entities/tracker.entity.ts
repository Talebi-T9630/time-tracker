import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn, ManyToMany, Timestamp } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Entity({ name: 'trackers' })
export class Tracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: EpochTimeStamp;

  @Column()
  stop_time: EpochTimeStamp;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.trackers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}