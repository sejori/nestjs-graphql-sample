import { ApiTags } from '@nestjs/swagger';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GravatarService } from './gravatar.service';
import { Gravatar } from './models/gravatar.model';
import { GetGravatarArgs } from './dto/args/get-gravatar.args';
import { RateLimit } from 'nestjs-rate-limiter'

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