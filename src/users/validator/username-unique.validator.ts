import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { UsersService } from '../users.service';
  
  @ValidatorConstraint({ name: 'isUsernameUnique', async: true })
  @Injectable()
  export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UsersService) {}
  
    async validate(username: string, args: ValidationArguments) {
      const user = await this.usersService.findByUsername(username);
      return !user;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Username must be unique';
    }
  }
  