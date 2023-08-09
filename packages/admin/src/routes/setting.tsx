import { RouteItem } from '@/types';
import { SettingOutlined } from '@ant-design/icons';

export const settingRoute: RouteItem = {
  path: '/setting',
  name: '系统设置',
  icon: <SettingOutlined />,
  redirect: '/setting/user',
  children: [
    {
      path: '/setting/user',
      name: '账号管理',
      lazy: async () => ({ Component: (await import('@/containers/User')).TableList }),
    },
  ],
};
