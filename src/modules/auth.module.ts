// Core Imports
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// Code Imports
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UsersModule } from '../modules/user.module';
import { AuthService } from '../services/auth/auth.service';


@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
