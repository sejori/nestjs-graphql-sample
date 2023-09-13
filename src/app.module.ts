import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { AuthService } from './auth/service/auth.service';
import { UserResolver } from './user/models/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, UserService, UserResolver],
})
export class AppModule {}
