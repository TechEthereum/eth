import { UserModel } from '@/types';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateAdminUserDto implements UserModel {
  id: string;

  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '账号不能为空' })
  @MaxLength(20, { message: '账号长度不能超过 20' })
  @MinLength(6, { message: '账号长度不能少于 6' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(20, { message: '密码长度不能超过 20' })
  @MinLength(6, { message: '密码长度不能少于 6' })
  password: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {}
