import { Injectable } from '@nestjs/common';
import { UsersService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity'
import { PayloadToken } from 'src/models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }

  generateJWT(user: User){
    const payload: PayloadToken = { role: user.role, sub: user.document };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

}
