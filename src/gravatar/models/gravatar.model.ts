import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'gravatar' })
export class Gravatar {
  @Field(() => String)
  url: string;
}