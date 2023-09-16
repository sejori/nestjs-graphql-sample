import { Injectable } from '@nestjs/common';
import { seedUsers } from '../test/mock.data';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor (private userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async seedDB() {
    await Promise.all(seedUsers.map(async user => {
      return await this.userService.createUser(user)
    }))
    return `DB seeded with mock users. Login with ${seedUsers[0].email} if you :)`
  }
}
