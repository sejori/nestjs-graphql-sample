import { Module } from '@nestjs/common';
import { GravatarService } from './gravatar.service';
import { GravatarResolver } from './gravatar.resolver';

@Module({
  providers: [GravatarResolver, GravatarService],
})

export class GravatarModule {}
