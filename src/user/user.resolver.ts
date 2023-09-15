
import { ApiTags } from '@nestjs/swagger';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RateLimit } from 'nestjs-rate-limiter'
import { User } from './models/user.model';
import { UserService } from './user.service';

import { GetUserArgs } from './dto/args/get-user.args';
import { ListUsersArgs } from './dto/args/list-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('v1/user')
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}
  
  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @Query(() => User)
  async getUser(
    @Args() getUserArgs: GetUserArgs
  ): Promise<User> {
    return this.userService.getUser(getUserArgs);
  }

  @UseGuards(AuthGuard)
  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @Query(() => [User])
  async listUsers(
    @Args() listUsersArgs: ListUsersArgs
  ): Promise<User[]> {
    return this.userService.listUsers(listUsersArgs);
  }

  @UseGuards(AuthGuard)
  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserData);
  }

  @UseGuards(AuthGuard)
  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(updateUserData);
  }

  // this mutation is not in the spec but seemed appropriate for CRUD.
  @UseGuards(AuthGuard)
  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.userService.deleteUser(deleteUserData);
  }
}