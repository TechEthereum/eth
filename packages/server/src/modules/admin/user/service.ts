import { AdminUser } from '@/entities';
import { ListQuery, UserModel } from '@eth/types';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pickBy } from 'lodash';
import { Repository } from 'typeorm';
import { CreateAdminUserDto, UpdateAdminUserDto } from './dto';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly service: Repository<AdminUser>,
  ) {}

  async create(body: CreateAdminUserDto) {
    const res = await this.findOne({ username: body.username });

    if (res) {
      throw new ConflictException('数据已存在');
    }

    const user = await this.service.create(body);

    return this.service.save(user);
  }

  async findAll(query?: ListQuery<UserModel>) {
    const { current = 1, pageSize = 10, sorter = '', ...restQuery } = query || {};
    const [field, order] = sorter.split(':');
    const finalOrder = field ? { [field]: order === 'ascend' ? 'ASC' : 'DESC' } : undefined;
    const finalWhere = pickBy(restQuery, (v) => (v ?? '') !== '');

    const [data, total] = await this.service.findAndCount({
      skip: (current - 1) * pageSize,
      take: pageSize,
      select: ['id', 'username', 'createdAt', 'updatedAt'],
      order: finalOrder,
      where: finalWhere,
    });

    return { data, total };
  }

  findOne(query: Partial<AdminUser>) {
    return this.service.findOneBy(query);
  }

  update(id: string, body: UpdateAdminUserDto) {
    return this.service.update({ id }, body);
  }

  remove(id: string) {
    return this.service.delete(id);
  }
}
