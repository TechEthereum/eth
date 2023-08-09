import { login } from '@/api';
import { setTokenToCache } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { UserModel } from '@eth/shared';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values: UserModel) => {
    const { accessToken } = await login(values);
    setTokenToCache(accessToken);
    navigate('/');
  };

  return (
    <LoginForm title="Eth Admin" subTitle="欢迎使用 Eth 后台管理系统" onFinish={handleSubmit}>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder="用户名"
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder="密码"
        rules={[
          {
            required: true,
          },
        ]}
      />
    </LoginForm>
  );
}

export default { Component: Login };
