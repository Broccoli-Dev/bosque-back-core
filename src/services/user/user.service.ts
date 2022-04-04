import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from 'src/entities/user.entity';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from 'src/requests/user.request';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(document: string) {
    const user = await this.userRepo.findOne(document);
    if (!user) {
      throw new NotFoundException(`User #${document} not found`);
    }
    return user;
  }

  async create(data: CreateUserRequest) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async update(document: string, changes: UpdateUserRequest) {
    const user = await this.findOne(document);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(document: string) {
    return this.userRepo.delete(document);
  }
}
