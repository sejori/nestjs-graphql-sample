import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../dto/models/user.model';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

import { GetUserArgs } from '../dto/args/get-user.args';
import { ListUsersArgs } from '../dto/args/list-users.args';
import { CreateUserInput } from '../dto/input/create-user.input';
import { UpdateUserInput } from '../dto/input/update-user.input';
import { DeleteUserInput } from '../dto/input/delete-user.input';

@ApiTags('v1/user')
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => User)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.userService.getUser(getUserArgs);
  }

  @UseGuards(AuthGuard)
  @Query(() => [User])
  async listUsers(@Args() listUsersArgs: ListUsersArgs): Promise<User[]> {
    return this.userService.listUsers(listUsersArgs);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    console.log('here');
    try {
      return this.userService.createUser(createUserData);
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(updateUserData);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.userService.deleteUser(deleteUserData);
  }
}
