// Core Imports
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
// Code Imports
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../entities/user.entity';
@UseGuards(ApiKeyGuard)
@UseGuards(AuthGuard('local'))
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJWT( req.user as User );
  }
}
