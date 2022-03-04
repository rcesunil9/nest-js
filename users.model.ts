import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsBoolean, Equals } from 'class-validator';
import * as mongoose from 'mongoose';
import { Role } from 'src/enum/entities.role.enum';

export const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  isMobileVerify: { type: Boolean, required: true },
  acceptedTerms: { type: Boolean, required: true },
  reset_pwd_token: { type: String, required: false }
},{timestamps:true});

export interface Users extends mongoose.Document {
  email: string;
  password: string;
  mobile: string;
  role: Role;
  isMobileVerify: boolean;
  acceptedTerms: boolean;
  reset_pwd_token?: string
}

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  
  @ApiProperty()
  @IsNotEmpty()
  role: Role;

  @Equals(true)
  acceptedTerms: boolean;
}

export class CodeVerfyDto {

  @ApiProperty()
  @IsNotEmpty()
  id: string

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

}

export class forgetPasswordDTO{
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  token: string;
}