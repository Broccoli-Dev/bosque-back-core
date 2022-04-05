import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@UseGuards(AuthGuard('local'))
@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
