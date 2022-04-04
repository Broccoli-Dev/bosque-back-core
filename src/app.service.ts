import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private clientPG: Client) {}
  getHello(): string {
    return 'Hello World!';
  }
}
