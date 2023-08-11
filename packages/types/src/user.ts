import { AuditInfo } from './common';

export interface UserModel extends AuditInfo {
  id: string;
  username: string;
  password: string;
}
