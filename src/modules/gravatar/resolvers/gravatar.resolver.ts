import { ApiTags } from '@nestjs/swagger';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GravatarService } from '../services/gravatar.service';
import { Gravatar } from '../dto/gravatar.model';
import { GetGravatarArgs } from '../dto/get-gravatar.args';

@ApiTags('v1/gravatar')
@Resolver(() => Gravatar)
export class GravatarResolver {
  constructor(private gravatarService: GravatarService) {}

  @Query(() => Gravatar)
  async getGravatar(
    @Args() getGravatarArgs: GetGravatarArgs,
  ): Promise<Gravatar> {
    return this.gravatarService.getUrl(getGravatarArgs.email);
  }
}
