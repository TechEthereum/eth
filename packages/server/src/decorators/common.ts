import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AUTH_GUARD_KEY = 'authGuard';

// 权限守卫类型，分为 后台管理 和 应用
export enum AuthGuardType {
  ADMIN = 'admin',
  APP = 'app',
}

export const AdminGuard = () => SetMetadata(AUTH_GUARD_KEY, AuthGuardType.ADMIN);
export const AppGuard = () => SetMetadata(AUTH_GUARD_KEY, AuthGuardType.APP);
