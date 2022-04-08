// Core Imports
import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
// Code Imports
@Injectable()
export class AppService {
  constructor(@Inject('PG') private clientPG: Client) {}
  getHello(): any {
    return {
      message: "Welcome to Bosque Core",
      statusCode: "200"
    };
  }
}
