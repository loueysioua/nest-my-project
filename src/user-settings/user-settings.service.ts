import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSettings } from '../schemas/UserSettings.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUserSettings(userSettings?: UserSettings) {
    const newUserSettings = new this.userSettingsModel(userSettings);
    return await newUserSettings.save();
  }
}
