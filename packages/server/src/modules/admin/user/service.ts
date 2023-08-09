import { AdminUser } from '@/entities';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new ConflictException('User already exists');
    }

    const user = await this.service.create(body);

    return this.service.save(user);
  }

  async findAll(query?: { current?: number; pageSize?: number }) {
    const { current = 1, pageSize = 10 } = query || {};
    const queryBuilder = this.service.createQueryBuilder('data');

    const [data, total] = await queryBuilder
      .skip((current - 1) * pageSize)
      .take(pageSize)
      .orderBy('data.createdAt', 'DESC')
      .getManyAndCount();

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
