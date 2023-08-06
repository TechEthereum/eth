import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: () => TypeOrmModuleOptions = () => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['../entities/**/*.ts'],
  autoLoadEntities: true,
  synchronize: true,
  timezone: 'Z',
});
