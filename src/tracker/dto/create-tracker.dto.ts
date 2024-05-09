import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateTrackerDto {

    user_id:number;
    start_time: EpochTimeStamp;
    stop_time: EpochTimeStamp;
    createdAt: Date;
    updatedAt: Date;

}
