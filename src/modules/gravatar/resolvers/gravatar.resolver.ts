import { ApiTags } from '@nestjs/swagger';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GravatarService } from 'src/modules/gravatar/services/gravatar.service';
import { Gravatar } from 'src/modules/gravatar/dto/gravatar.model';
import { GetGravatarArgs } from 'src/modules/gravatar/dto/get-gravatar.args';

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
