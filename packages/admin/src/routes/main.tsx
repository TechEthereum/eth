import { productRoute } from './product';
import { settingRoute } from './setting';

export const mainRote = {
  path: '/',
  lazy: async () => ({ Component: (await import('@/layouts/BasicLayout')).BasicLayout }),
  children: [productRoute, settingRoute],
};
