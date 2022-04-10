// Core Imports
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from 'src/requests/user.request';
// Code imports
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { UsersService } from '../../services/user/user.service';

@UseGuards(ApiKeyGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':document')
  getUser(@Param('document') document: string) {
    return this.usersService.findOne(document);
  }

  @Post()
  CreateUser(@Body() payload: CreateUserRequest) {
    return this.usersService.create(payload);
  }

  @Put(':document')
  UpdateUser(
    @Param('document') document: string,
    @Body() payload: UpdateUserRequest,
  ) {
    return this.usersService.update(document, payload);
  }

  @Delete(':document')
  remove(@Param('document') document: string) {
    return this.usersService.remove(document);
  }
}
