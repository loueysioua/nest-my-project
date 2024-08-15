import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { User } from './schemas/User.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('hello')
  getHello(): string {
    console.log(this.configService.get('APP_PORT'));
    return this.appService.getHello();
  }

  // @Get('user')
  // getUser(): string {
  //   console.log(User.name);
  //   return this.appService.getUser();
  // }
}
