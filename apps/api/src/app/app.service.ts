import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return 'data';
  }
}
