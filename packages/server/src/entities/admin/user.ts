import { UserModel } from '@/types';
import { Column, Entity } from 'typeorm';
import { BaseEntityWithAudit } from '../common';

@Entity()
export class AdminUser extends BaseEntityWithAudit implements UserModel {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
