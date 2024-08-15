import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello nest!';
  }

  getUser() {
    return 'This is the User class model';
  }
}
