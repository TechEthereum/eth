import { UserModel } from '@eth/types';
import { request } from './util';

export function login(data: Partial<UserModel>): Promise<{ accessToken: string }> {
  return request.post('/auth/login', data);
}
