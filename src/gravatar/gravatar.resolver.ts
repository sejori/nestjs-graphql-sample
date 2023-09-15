import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GravatarService } from './gravatar.service';
import { Gravatar } from './models/gravatar.model';
import { GetGravatarArgs } from './dto/args/get-gravatar.args';

@Resolver(() => Gravatar)
export class GravatarResolver {
  constructor(
    private gravatarService: GravatarService
  ) {}

  @Query(() => Gravatar)
  async getGravatar(@Args() getGravatarArgs: GetGravatarArgs): Promise<Gravatar> {
    return this.gravatarService.getUrl(getGravatarArgs.email);
  }
}