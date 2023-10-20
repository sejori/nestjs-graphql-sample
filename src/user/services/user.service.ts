import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from 'src/prisma/services/prisma.service';

import { GetUserArgs } from 'src/user/dto/args/get-user.args';
import { ListUsersArgs } from 'src/user/dto/args/list-users.args';
import { CreateUserInput } from 'src/user/dto/input/create-user.input';
import { UpdateUserInput } from 'src/user/dto/input/update-user.input';
import { DeleteUserInput } from 'src/user/dto/input/delete-user.input';
import { FollowUserInput } from '../dto/input/follow-user.input';
import { UnfollowUserInput } from '../dto/input/unfollow-user.input';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) {}

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    try {
      return await this.prisma.user.findUnique({ 
        where: { 
          id: getUserArgs.id 
        },
        include: {
          follows: true,
          followedBy: true
        }
      });
    } catch(e) {
      // Logger service can be used here for cloud logs if needed - skipped for now
      throw new HttpException('Failed to get user', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  public async listUsers(listUsersArgs: ListUsersArgs): Promise<User[]> {
    try {
      const { ids, firstNames, lastNames, emails } = listUsersArgs
      const filters = ids || firstNames || lastNames || emails 
        ? {
          OR: [
            { id: { in: listUsersArgs.ids } },
            { firstName: { in: listUsersArgs.firstNames } },
            { lastName: { in: listUsersArgs.lastNames } },
            { email: { in: listUsersArgs.emails } },
          ],
        }
        : {}

      return await this.prisma.user.findMany({
        where: filters,
        include: {
          follows: true,
          followedBy: true
        },
        orderBy: listUsersArgs.sortBy
        ? [
          {
            [listUsersArgs.sortBy]: listUsersArgs.order || 'asc'
          }
        ]
        : [],
        skip: listUsersArgs.skip,
        take: listUsersArgs.limit
      });
    } catch(e) {
      throw new HttpException('Failed to get users', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  public async createUser(
    createUserData: CreateUserInput,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          ...createUserData,
        },
        include: {
          follows: true,
          followedBy: true
        },
      });
      return user;
    } catch(e) {
      throw new HttpException('Failed to create user - does it already exist?', HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUser(
    updateUserData: UpdateUserInput,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id: updateUserData.id },
        include: {
          follows: true,
          followedBy: true
        },
        data: updateUserData,
      });
  
      return user;
    } catch(e) {
      throw new HttpException('Failed to update user - does it exist?', HttpStatus.BAD_REQUEST);
    }
  }

  public async followUser(
    followUserInput: FollowUserInput,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id: followUserInput.id },
        include: {
          follows: true,
          followedBy: true
        },
        data: {
          follows: {
            connect: {
              id: followUserInput.follows
            }
          }
        }
      });
  
      return user;
    } catch(e) {
      throw new HttpException('Failed to update user - does it exist?', HttpStatus.BAD_REQUEST);
    }
  }

  public async unfollowUser(
    unfollowUserInput: UnfollowUserInput,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id: unfollowUserInput.id },
        include: {
          follows: true,
          followedBy: true
        },
        data: {
          follows: {
            disconnect: {
              id: unfollowUserInput.unfollows
            }
          }
        },
      });
  
      return user;
    } catch(e) {
      throw new HttpException('Failed to update user - does it exist?', HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(
    deleteUserData: DeleteUserInput,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: deleteUserData.id,
        },
        include: {
          follows: true,
          followedBy: true
        }
      });
  
      return user;
    } catch(e) {
      throw new HttpException('Failed to delete user - does it already exist?', HttpStatus.BAD_REQUEST);
    }
  }
}
