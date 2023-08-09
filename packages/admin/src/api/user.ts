import { ListQuery, ListResponse, User } from '@/types';
import { request } from './util';

export function fetchUser(params: ListQuery<User>): Promise<ListResponse<User>> {
  return request.get('/user', { params });
}

export function removeUser(id: string) {
  return request.delete(`/user/${id}`);
}

export function updateUser(data: User) {
  return request.patch(`/user/${data.id}`, data);
}

export function createUser(data: User) {
  return request.post('/user', data);
}
