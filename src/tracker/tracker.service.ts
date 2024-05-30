import { Injectable } from '@nestjs/common';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';
import { Tracker } from './entities/tracker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { error } from 'console';



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

  async createTracker(user_id: number,type:string): Promise<Tracker> {
    const user = await this.userRepository.findOne({where: {user_id}});
    console.log(user);
    if (!user) {
      throw new Error(`User with id ${user_id} not found`);
    }
    //2 more methods
    // fetch tracking for day (public)
    //fetch tracking for the week
    const tracker = new Tracker();
    if(type==="start"){
      tracker.start_time =  (Date.now()).toString();
      tracker.stop_time =null;
    }else if(type==="stop"){
      tracker.stop_time =  (Date.now()).toString();
      tracker.start_time =null;
    }else{
      throw error("Tracker type undifined");
    }
   
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
