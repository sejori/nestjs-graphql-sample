import { Injectable } from '@nestjs/common';
import { seedUsers } from 'test/mock.data';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AppService {
  constructor (private userService: UserService) {}

  getHello(): string {
    return `<!DOCTYPE html>
      <html>
        <head>
          <title>NestJS GraphQL Users</title>
          <style>
            html, body, input { font-family: sans-serif; font-size: 24px; }
            li { margin: 20px; }
          </style>
        </head>
        <body>
          <h1>NestJS GraphQL Users</h1>
          <ol>
            <li>GET <a href='/seed-db'><code>/seed-db</code></a></li>
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
            <li>GET <a href='/graphql'><code>/graphql</code></a> to enter playground</li>
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
        await this.userService.createUser(user);
      }))
    } catch(e) {
      console.log(e);
    }
    return `DB seeded with mock users. Try logging in with ${seedUsers[0].email}.`
  }
}
