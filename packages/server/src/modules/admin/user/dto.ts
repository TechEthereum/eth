import { UserModel } from '@/types';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAdminUserDto implements UserModel {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {}
