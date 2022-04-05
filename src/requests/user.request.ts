import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  @Length(200)
  readonly name: string;
  
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(20)
  readonly document: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsString()
  @IsOptional()
  @Length(100)
  readonly nick: string;

  // @IsOptional()
  // @IsPositive()
  // @ApiProperty()
  // readonly employeeId: number;
}

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}
