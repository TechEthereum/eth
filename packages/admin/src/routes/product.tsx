import { RouteItem } from '@/types';
import { ShoppingOutlined } from '@ant-design/icons';

export const productRoute: RouteItem = {
  path: '/product',
  name: '商品中心',
  icon: <ShoppingOutlined />,
  children: [
    {
      path: '/product/user',
      name: '商品管理',
      lazy: async () => ({ Component: (await import('@/containers/User')).TableList }),
    },
    {
      path: '/product/user2',
      name: '商品管理2',
      lazy: async () => ({ Component: (await import('@/containers/User')).TableList }),
    },
  ],
};
