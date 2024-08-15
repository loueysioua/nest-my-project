import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('add')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //Put is used to modify the entire resource
  //while Patch is for modiying a part of the resource
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException('User Not Found');
    return updatedUser;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    //we need to check the id if it is a valid object id of mongodb
    // => this is better done in the middleware
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new NotFoundException('User not found');
    return findUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new NotFoundException('User Not Found');
    return deletedUser;
  }
}
