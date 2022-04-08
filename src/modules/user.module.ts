// Core Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Code Imports
import { UsersController } from '../controllers/user/user.controller';
import { UsersService } from '../services/user/user.service';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
