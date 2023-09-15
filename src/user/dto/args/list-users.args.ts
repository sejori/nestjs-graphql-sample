import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class ListUsersArgs {
  @Field(() => [String], { nullable: true })
  // @IsArray() - removed array validator to fascilitate optional arg
  ids?: string[];

  @Field(() => [String], { nullable: true })
  // @IsArray()
  firstNames?: string[];

  @Field(() => [String], { nullable: true })
  // @IsArray()
  lastNames?: string[];

  @Field(() => [String], { nullable: true })
  // @IsArray()
  emails?: string[];

  @Field(() => String, { nullable: true })
  sortBy?: 'firstName' | 'lastName' | 'email'

  @Field(() => String, { nullable: true })
  order?: 'asc' | 'desc'
}
