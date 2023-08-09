import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status={404}
      subTitle={
        <div>
          <Typography.Paragraph>您访问的页面不存在！</Typography.Paragraph>
          <Button
            type="primary"
            onClick={() => {
              navigate('/');
            }}
          >
            回到首页
          </Button>
        </div>
      }
    />
  );
}
