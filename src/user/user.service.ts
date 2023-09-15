import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../_database/prisma.service';

import { GetUserArgs } from './dto/args/get-user.args';
import { ListUsersArgs } from './dto/args/list-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger
  ) {}

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    try {
      return await this.prisma.user.findUnique({ 
        where: { 
          id: getUserArgs.id 
        } 
      });
    } catch(e) {
      // this.logger.error(e);
      throw new HttpException('Failed to get user', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  public async listUsers(listUsersArgs: ListUsersArgs): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          OR: [
            { id: { in: listUsersArgs.ids } },
            { firstName: { in: listUsersArgs.firstNames } },
            { lastName: { in: listUsersArgs.lastNames } },
            { email: { in: listUsersArgs.emails } },
          ],
        },
        orderBy: listUsersArgs.sortBy
          ? [
            {
              [listUsersArgs.sortBy]: listUsersArgs.order || 'asc'
            }
          ]
          : []
      });
    } catch(e) {
      // this.logger.error(e);
      throw new HttpException('Failed to get users', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  public async createUser(
    createUserData: CreateUserInput,
  ): Promise<User | Error> {
    try {
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          ...createUserData,
        },
      });
      return user;
    } catch(e) {
      // this.logger.error(e);
      throw new HttpException('Failed to create user - does it already exist?', HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUser(
    updateUserData: UpdateUserInput,
  ): Promise<User| Error> {
    try {
      const user = await this.prisma.user.update({
        where: { id: updateUserData.id },
        data: updateUserData,
      });
  
      return user;
    } catch(e) {
      // this.logger.error(e);
      throw new HttpException('Failed to update user - does it exist?', HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(
    deleteUserData: DeleteUserInput,
  ): Promise<User| Error> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: deleteUserData.id,
        },
      });
  
      return user;
    } catch(e) {
      // this.logger.error(e);
      throw new HttpException('Failed to delete user - does it already exist?', HttpStatus.BAD_REQUEST);
    }
  }
}
