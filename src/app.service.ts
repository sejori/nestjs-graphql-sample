import { Injectable } from '@nestjs/common';
import { seedUsers } from '../test/mock.data';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor (private userService: UserService) {}

  getHello(): string {
    return `<!DOCTYPE html>
      <html>
        <head>
          <title>PYNEA GraphQL</title>
          <style>
            html, body, input { font-family: sans-serif; font-size: 24px; }
            li { margin: 20px; }
          </style>
        </head>
        <body>
          <h1>PYNEA GraphQL Users</h1>
          <ol>
            <li>GET <code>/seed-db</code></li>
            <li>
              POST email to <code>/auth/login</code> for a token
              <form method='POST' action='/auth/login'>
                <label>
                  Email:
                  <input name='email' type='email'>
                </label>
                <input type='submit' value='Login'>
              </form>
            </li>
            <li>GET <code>/graphql</code> to enter playground</li>
            <li>Set Authorization header to 'Bearer [token]'</li>
            <li>Read <code>/src/schema.graphql</code></li>
            <li>Happy mutating :^)</li>
          </ol>
        </body>
      </html>
    `;
  }

  public async seedDB() {
    try {
      await Promise.all(seedUsers.map(async user => {
        return await this.userService.createUser(user)
      }))
    } catch(e) {
      return `DB seeded with mock users. Try logging in with ${seedUsers[0].email}.`
    }
  }
}
