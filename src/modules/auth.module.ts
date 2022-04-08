// Core Imports
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
// Code Imports
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UsersModule } from '../modules/user.module';
import { AuthService } from '../services/auth/auth.service';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { AuthController } from '../controllers/auth/auth.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
