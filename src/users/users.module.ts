import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  UserSettings,
  UserSettingsSchema,
} from '../schemas/UserSettings.schema';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { UserSettingsController } from '../user-settings/user-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
    UserSettingsModule,
  ],
  providers: [UsersService, UserSettingsService],
  controllers: [UsersController, UserSettingsController],
})
export class UsersModule {}
