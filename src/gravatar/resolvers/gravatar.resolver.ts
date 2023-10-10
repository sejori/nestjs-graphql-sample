import { ApiTags } from '@nestjs/swagger';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GravatarService } from 'src/gravatar/services/gravatar.service';
import { Gravatar } from 'src/gravatar/models/gravatar.model';
import { GetGravatarArgs } from 'src/gravatar/dto/get-gravatar.args';

@ApiTags('v1/gravatar')
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