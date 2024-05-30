import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateTrackerDto {

    user_id:number;
    start_time: string;
    stop_time: string;
    createdAt: Date;
}
