import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class GetGravatarArgs {
  @Field()
  @IsEmail()
  email: string;
}
