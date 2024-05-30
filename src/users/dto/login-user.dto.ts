import {IsNotEmpty, IsString } from 'class-validator';


export class LoginUserDto{
    @IsString()
    @IsNotEmpty({
        message:'username cannot be left empty'
    })
     username: string;
     @IsNotEmpty({
        message:'user password cannot be left empty'
    })
     user_password: number;
}
