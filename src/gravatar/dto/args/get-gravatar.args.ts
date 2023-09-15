import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetGravatarArgs {
  @Field()
  @IsNotEmpty()
  email: string;
}
