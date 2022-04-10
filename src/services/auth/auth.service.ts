// Core Imports

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Code Imports

import { UsersService } from '../../services/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }

}
