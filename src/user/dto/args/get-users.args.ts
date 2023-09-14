import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetUsersArgs {
  @Field(() => [String])
  @IsArray()
  ids?: string[];

  @Field(() => [String])
  @IsArray()
  firstNames?: string[];

  @Field(() => [String])
  @IsArray()
  lastNames?: string[];

  @Field(() => [String])
  @IsArray()
  emails?: string[];
}
