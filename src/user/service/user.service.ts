import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  findOneById(id: string): User {
    return {
      id: 'hello',
      firstName: 'Mylena',
      lastName: 'Vendramini',
      email: 'i_smile@live.co.uk'
    } // TODO: postgres integration here
  }
}
