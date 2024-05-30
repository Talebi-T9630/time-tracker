import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(200)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
    .then(response => ({ message: response.response,statusCode:response.statusCode }))
    .catch(error => ({ error: error.message }));
  }

  @Get('find-all')
  findAll( @Query('search') search?: string, @Query('sort') sort?: string,@Query('direction') direction?: string,) {   
    return this.usersService.findAll(search,sort,direction);
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(+user_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('login')
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

}
