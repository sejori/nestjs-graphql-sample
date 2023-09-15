import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  id: UserDB['id'];

  @Field(() => String)
  firstName: UserDB['firstName'];

  @Field(() => String)
  lastName: UserDB['lastName'];

  @Field(() => String)
  email: UserDB['email'];

  @Field(() => String)
  createdAt: UserDB['createdAt'];

  @Field(() => String)
  updatedAt: UserDB['updatedAt'];
}