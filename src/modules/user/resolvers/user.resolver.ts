import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/modules/user/dto/models/user.model';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

import { GetUserArgs } from 'src/modules/user/dto/args/get-user.args';
import { ListUsersArgs } from 'src/modules/user/dto/args/list-users.args';
import { CreateUserInput } from 'src/modules/user/dto/input/create-user.input';
import { UpdateUserInput } from 'src/modules/user/dto/input/update-user.input';
import { DeleteUserInput } from 'src/modules/user/dto/input/delete-user.input';

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
    return this.userService.createUser(createUserData);
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
