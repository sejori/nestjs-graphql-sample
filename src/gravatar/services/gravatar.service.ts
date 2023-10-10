import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';
import { Gravatar } from 'src/gravatar/models/gravatar.model';

@Injectable()
export class GravatarService {
  constructor() {}

  async getUrl(email: string): Promise<Gravatar> {
    try {
      return {
        url: `https://gravatar.com/avatar/${createHash('md5').update(email).digest('hex')}`
      }
    } catch(e) {
      throw new HttpException('Failed to generate Gravatar link', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
