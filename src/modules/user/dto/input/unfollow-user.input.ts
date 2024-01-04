import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UnfollowUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  unfollows: string;
}
