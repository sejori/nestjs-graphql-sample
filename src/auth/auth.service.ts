import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AuthService {
  validateRequest(request: Request) {
    // well, would you look at that, ur authed
    // 3d party auth service incoming
    return true;
  }

  validateUser(user: any) {
    // TODO: merge this and above method
    // TODO: define user type / infer from graphQL
    return true;
  }

  signUp(body: any): User {
    return {
      id: 'hello',
      firstName: 'Mylena',
      lastName: 'Vendramini',
      email: 'i_smile@live.co.uk',
      createdAt: new Date(),
      updatedAt: new Date()
    } // TODO: return created user obj from gql
  }

  signIn(user: any): User {
    return {
      id: 'hello',
      firstName: 'Mylena',
      lastName: 'Vendramini',
      email: 'i_smile@live.co.uk',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  refreshToken(token: string) {
    return 'new token'
  }

  // stateless sign out: manually expire JWT
  // TODO: replace this with 3rd party integation
  async signOut(bearer: string) {
    // const decodedToken: any = jwtManipulationService.decodeJwtToken(bearer, 'all')
    // await this.usersRepository.triggerRefreshToken(decodedToken.username)
    // const expireDate: number = decodedToken.exp
    // const remainingSeconds: number = Math.round(expireDate - Date.now() / 1000)

    // await this.redisService.setOnlyKey(bearer.split(' ')[1], remainingSeconds)
    return { status: 'ok', message: 'Token is killed' }
  }
}
