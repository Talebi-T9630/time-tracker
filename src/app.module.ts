import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Tracker } from './tracker/entities/tracker.entity';
import { TrackerModule } from './tracker/tracker.module';



@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      //TO DO:: ADD Auto-load entities
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'local_db',
      entities: [User,Tracker],
      synchronize: true,
    }),
    TrackerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
