import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field() // TODO: <- make unique with directive
  email: string;
} // TODO: check if createdAt and updatedAt need to be in schema

// TODO: should fields have descriptions?

// - `id` (auto-generated UUID)
// - `firstName`
// - `lastName`
// - `email` (unique)
// - `createdAt` (timestamp, auto-generated)
// - `updatedAt` (timestamp, auto-generated)