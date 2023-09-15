import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { GravatarModule } from './gravatar/gravatar.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './_database/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.graphql',
      context: ({ req }) => ({ req })
    }),
    UserModule,
    GravatarModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, Logger],
})
export class AppModule {}
