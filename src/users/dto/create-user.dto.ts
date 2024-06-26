import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword,Validate } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @IsNotEmpty({
        message:'username cannot be left empty'
    })
    username: string;

    @IsNumber()
    @IsNotEmpty({
        message:'username cannot be left empty'
    })
    user_company_id:number;

    @IsEmail()
    @IsNotEmpty({
        message:'username cannot be left empty'
    })
    user_email: string;

    @IsStrongPassword()
    @IsNotEmpty({
        message:'username cannot be left empty'
    })
    user_password:string;
    
    @IsBoolean()
    @IsNotEmpty({
        message:'username cannot be left empty'
    })
    user_status:boolean;

    createdAt:Date;
    updatedAt:Date;

}
