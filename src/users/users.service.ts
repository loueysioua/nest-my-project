import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { UserSettings } from '../schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userSettingsService: UserSettingsService,
  ) {}

  async createUser({ settings, ...userWithoutSettings }: CreateUserDto) {
    if (settings) {
      const newSavedSettings =
        await this.userSettingsService.createUserSettings(settings);
      const newUser = new this.userModel({
        ...userWithoutSettings,
        settings: newSavedSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(userWithoutSettings);
    return newUser.save();
  }

  getAllUsers() {
    return this.userModel.find().populate('settings').populate('todos');
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings').populate('todos');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
