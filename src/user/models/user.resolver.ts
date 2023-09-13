import { Resolver, Query, Args, Parent } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from '../service/user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query(returns => User)
  async user(@Args('id') id: string) {
    return this.userService.findOneById(id);
  }
}