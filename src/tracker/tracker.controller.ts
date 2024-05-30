import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';

@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post()
  create(@Body() createTrackerDto: CreateTrackerDto) {
    return this.trackerService.create(createTrackerDto);
  }

  @Post('start-time')
  createTracker(@Query('user_id') user_id: number, @Query('type') type: string) {
    return this.trackerService.createTracker(user_id,type);
  }

  @Get('get-tracker-list')
  getTrackersByDate(@Query('userId') user_id: number, @Query('startOfDay') startOfDay: string, @Query('endOfDay') endOfDay: string) {
    return this.trackerService.getTrackersByDate(startOfDay,endOfDay,user_id);
  }
  @Get()
  findAll() {
    return this.trackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackerDto: UpdateTrackerDto) {
    return this.trackerService.update(+id, updateTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackerService.remove(+id);
  }
}
