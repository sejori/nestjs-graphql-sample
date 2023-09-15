import { Injectable } from '@nestjs/common';
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
  constructor(private prisma: PrismaService) {}

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return await this.prisma.user.findUnique({ 
      where: { 
        id: getUserArgs.id 
      } 
    });
  }

  public async listUsers(listUsersArgs: ListUsersArgs): Promise<User[]> {
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
            [listUsersArgs.sortBy]: listUsersArgs.order || "asc"
          }
        ]
        : []
    });
  }

  public async createUser(
    createUserData: CreateUserInput,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        ...createUserData,
      },
    });
    return user;
  }

  public async updateUser(
    updateUserData: UpdateUserInput,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: updateUserData.id },
      data: updateUserData,
    });

    return user;
  }

  public async deleteUser(
    deleteUserData: DeleteUserInput,
  ): Promise<User> {
    const user = await this.prisma.user.delete({
      where: {
        id: deleteUserData.id,
      },
    });

    return user;
  }
}
