import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { .Controller } from './user.controller.ts/..controller';
import { UserController } from './src/controllers/user/user.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, .Controller, UserController],
  providers: [AppService],
})
export class AppModule {}
