import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from 'src/requests/user.request';
import { UsersService } from 'src/services/user/user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':document')
  getUser(@Param('document') document: string){
    return this.usersService.findOne(document);
  }

  @Post()
  CreateUser(@Body() payload: CreateUserRequest) {
    return this.usersService.create(payload);
  }

  @Put(':document')
  UpdateUser(
    @Param('document') document: string ,
    @Body() payload: UpdateUserRequest,
  ) {
    return this.usersService.update(document, payload);
  }

  @Delete(':document')
  remove(@Param('document') document: string) {
    return this.usersService.remove(document);
  }
}
