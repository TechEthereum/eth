import { mainRote } from '@/routes/main';
import { LogoutOutlined } from '@ant-design/icons';
import type { ProLayoutProps, ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const settings: Partial<ProSettings> = {
  title: 'Eth Admin',
  // layout: 'mix',
  // fixSiderbar: true,
  // splitMenus: true,
  // siderMenuType: 'group',
  // menu: {
  //   collapsedShowGroupTitle: true,
  // },
};

export function BasicLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const avatarProps: ProLayoutProps['avatarProps'] = {
    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    size: 'small',
    title: '七妮妮',
    render: (_, dom) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
              },
            ],
          }}
        >
          {dom}
        </Dropdown>
      );
    },
  };

  const menuItemRender: ProLayoutProps['menuItemRender'] = (item, dom) => (
    <div
      onClick={() => {
        const path = item.path ?? '/';
        navigate(path);
      }}
    >
      {dom}
    </div>
  );

  return (
    <ProLayout
      location={{
        pathname,
      }}
      route={mainRote}
      avatarProps={avatarProps}
      menuItemRender={menuItemRender}
      {...settings}
    >
      <PageContainer title={false}>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
}
