import { Controller, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,EntityMetadata, getMetadataArgsStorage} from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { NotFoundException } from '@nestjs/common';
import { SMTPClient } from 'emailjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
      const password= await UsersService.passwordHash(createUserDto.user_password); 
      const checkDuplicateEmailUsername= await this.checkDuplicateEmailUsername(createUserDto.username,createUserDto.user_email);
      if(checkDuplicateEmailUsername===true){
        const user =  this.usersRepository.create({
          ...createUserDto,
          user_password:password.toString(),
          createdAt:Date(),
        });
    
        await this.usersRepository.save(user);
        return {response:'A confirmation Email has been sent to :'+user.user_email};
      }else{
        return {response:checkDuplicateEmailUsername,statusCode:404};
      }
  }
   


  async checkDuplicateEmailUsername(username: string, user_email: string) {
    try {
      const existingUsername = await this.usersRepository.findOne({where: {username} });
      if (existingUsername) {
        throw new Error('This username already exists, please choose a new one.');
      }
  
      const existingEmail = await this.usersRepository.findOne({ where: {user_email} });
      if (existingEmail) {
        throw new Error('This email is already in use, please use a different email.');
      }
  
      return true;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  
  static async confirmationEmail(email:string){
    // const client = new SMTPClient({
    //   user: 'user',
    //   password: 'password',
    //   host: 'smtp.your-email.com',
    //   ssl: true,
    // });
    
    // try {
    //   const message = await client.sendAsync({
    //     text: 'i hope this works',
    //     from: 'talebitarane@gmail.com',
    //     to: 'taranetalebi@yahoo.ca',
    //     subject: 'testing emailjs',
    //     attachment: [
    //       { data: '<html>i <i>hope</i> this works!</html>', alternative: true },
    //     ],
    //   });
    //   console.log(message);
    // } catch (err) {
    //   console.error(err);
    // }
  }


  static async passwordHash(value:string){
    const iv = randomBytes(16);
    const password = value;
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(value),
      cipher.final(),
    ]);

    return key;
  }

  async findAll(search:string, sort:string, direction:string) {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    // Add search condition if search parameter is provided
    if (search) {
      queryBuilder.where('users.username LIKE :search', { search: `%${search}%` });
    }

    // Add sorting if sort and direction parameters are provided
    if (sort && direction) {
      queryBuilder.orderBy(`users.${sort}`, direction.toUpperCase() as 'ASC' | 'DESC');
    }

    // Execute the query
    return queryBuilder.getMany(); 
  }

 async findOne(user_id: number) {
    const user = await this.usersRepository.createQueryBuilder("users")
    .where("users.user_id = :user_id", { user_id: user_id })
    .getOne();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto){
    //TODO: Create password encryptions and do Keygen for the API authorization
    const username = loginUserDto.username;
    const password = loginUserDto.user_password;
    if(username!=null && password!=null){
      const user = await this.usersRepository.createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .andWhere("user.user_password = :user_password", { user_password: password })
      .getOne();
      if(user){
        return 'user logged in';
      }else{
        return 'user not found';  
      }
    }
  }
    
}

