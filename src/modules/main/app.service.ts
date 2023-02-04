import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { msg: string } {
    return { msg: 'Hello, World!' };
  }

  getPublic(): { msg: string } {
    return { msg: 'public route.' };
  }

  getUserResource(): { msg: string } {
    return { msg: 'resource for users.' };
  }
}
