import { Resolver, Query, Args, Parent } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './service/user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query(returns => User)
  async user(@Args('id') id: string) {
    return this.userService.findOneById(id);
  }

  // TODO: Gonna do a badass gravatar integration here
  // https://gravatar.com/avatar/7cf997d80f172b5e026b2ac67a1482da
  // need to MD5 hash email for image url (^ sebringrose@gmail.com)
}