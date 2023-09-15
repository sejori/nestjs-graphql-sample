import { Injectable } from '@nestjs/common';
import { mockUsers } from 'test/mock.data';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor (private userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async seedDB() {
    await Promise.all(mockUsers.map(async user => {
      return await this.userService.createUser(user)
    }))
    return `DB seeded with mock users. Login with ${mockUsers[0].email} if you :)`
  }
}
