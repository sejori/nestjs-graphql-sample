import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  follows: string;
}
