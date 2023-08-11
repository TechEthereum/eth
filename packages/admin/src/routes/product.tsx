import { RouteItem } from '@/types';
import { ShoppingOutlined } from '@ant-design/icons';
import { redirect } from 'react-router-dom';

export const productRoute: RouteItem = {
  path: '/product',
  name: '商品中心',
  icon: <ShoppingOutlined />,
  children: [
    {
      index: true,
      loader() {
        return redirect('/product/user');
      },
    },
    {
      path: '/product/user',
      name: '商品管理',
      lazy: async () => ({ Component: (await import('@/containers/User')).TableList }),
    },
  ],
};
