import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  id: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  @IsEmail()
  email?: string;
}
