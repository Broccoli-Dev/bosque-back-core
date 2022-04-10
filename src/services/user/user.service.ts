// Core Imports

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

// Code Imports

import { User } from '../../entities/user.entity';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from '../../requests/user.request';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async findAll() {
    let users = await this.userRepo.find();
    users.map((element) => {
      delete element.password;
      return element;
    });
    return users;
  }

  async findOne(document: string) {
    const user = await this.userRepo.findOne(document);
    if (!user) {
      throw new NotFoundException(`User #${document} not found`);
    }
    delete user.password;
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } })
    return user;
  }

  async create(data: CreateUserRequest) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const user = await this.userRepo.save(newUser);
    delete user.password;
    return user;
  }

  async update(document: string, changes: UpdateUserRequest) {
    const newUser = await this.findOne(document);
    this.userRepo.merge(newUser, changes);
    const user = await this.userRepo.save(newUser);;
    delete user.password;
    return user;
  }

  async remove(document: string) {
    const result = await this.userRepo.delete(document)
    if(result.affected > 0){
      return {
        statusCode: "200",
        message: `User with document ${document} was deleted`
      };
    }
    throw new NotFoundException(`User ${document} didn't change`) ;
  }
}
