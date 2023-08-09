import { AdminGuard } from '@/decorators';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { CreateAdminUserDto, UpdateAdminUserDto } from './dto';
import { AdminUserService } from './service';

@Controller('admin/user')
@AdminGuard()
export class AdminUserController {
  constructor(private readonly service: AdminUserService) {}

  @Get('profile')
  async profile(@Req() req) {
    const { username } = req.USER;
    return this.service.findOne({ username });
  }

  @Post()
  create(@Body() body: CreateAdminUserDto) {
    return this.service.create(body);
  }

  @Get()
  findAll(@Query() query) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAdminUserDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
