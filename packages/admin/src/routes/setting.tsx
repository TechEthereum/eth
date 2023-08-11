import { RouteItem } from '@/types';
import { SettingOutlined } from '@ant-design/icons';
import { redirect } from 'react-router-dom';

export const settingRoute: RouteItem = {
  path: '/setting',
  name: '系统设置',
  icon: <SettingOutlined />,
  children: [
    {
      index: true,
      loader() {
        return redirect('/setting/user');
      },
    },
    {
      path: '/setting/user',
      name: '账号管理',
      lazy: async () => ({ Component: (await import('@/containers/User')).TableList }),
    },
  ],
};
