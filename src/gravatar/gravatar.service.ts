import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Gravatar } from './models/gravatar.model';

@Injectable()
export class GravatarService {
  constructor() {}

  async getUrl(email: string): Promise<Gravatar> {
    return {
      url: `https://gravatar.com/avatar/${createHash('md5').update(email).digest('hex')}`
    }
  }
}
