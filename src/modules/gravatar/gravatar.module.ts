import { Module } from '@nestjs/common';
import { GravatarService } from './services/gravatar.service';
import { GravatarResolver } from './resolvers/gravatar.resolver';

@Module({
  providers: [GravatarResolver, GravatarService],
})
export class GravatarModule {}
