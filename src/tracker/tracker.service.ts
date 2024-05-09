import { Injectable } from '@nestjs/common';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';
import { Tracker } from './entities/tracker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from 'src/users/entities/user.entity';



@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker)
    private trackerRepository: Repository<Tracker>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
 
 async create(createTrackerDto: CreateTrackerDto) {
    const tracker =  this.trackerRepository.create({
      ...createTrackerDto,
    });    
    
    await this.trackerRepository.save(tracker);
    return 'This action adds a new tracker';
  }

  async createTracker(user_id: number, start_time: string, stop_time: string): Promise<Tracker> {
    const user = await this.userRepository.findOne({where: {user_id}});
    if (!user) {
      throw new Error(`User with id ${user_id} not found`);
    }

    const tracker = new Tracker();
    tracker.start_time = parseInt(start_time);
    tracker.stop_time = parseInt(stop_time);
    tracker.user = user;

    return await this.trackerRepository.save(tracker);
  }

  findAll() {
    return `This action returns all tracker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tracker`;
  }

  update(id: number, updateTrackerDto: UpdateTrackerDto) {
    return `This action updates a #${id} tracker`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracker`;
  }
}
