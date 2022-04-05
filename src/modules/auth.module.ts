import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';

import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { UsersModule } from '../modules/user.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
