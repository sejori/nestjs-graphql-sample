import { ArgsType, Int, Field } from '@nestjs/graphql';
import { Max, Min } from 'class-validator'

@ArgsType()
export class ListUsersArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => [String], { nullable: true })
  firstNames?: string[];

  @Field(() => [String], { nullable: true })
  lastNames?: string[];

  @Field(() => [String], { nullable: true })
  emails?: string[];

  @Field(() => String, { nullable: true })
  sortBy?: 'firstName' | 'lastName' | 'email';

  @Field(() => String, { nullable: true })
  order?: 'asc' | 'desc';

  @Field(() => Int)
  @Min(0)
  skip? = 0;

  @Field(() => Int)
  @Min(1)
  @Max(100)
  limit? = 20;
}
