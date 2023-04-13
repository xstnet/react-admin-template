import ContentBox from '@/components/ContextBox';
import { Button, Result, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage: React.FC<KV> = () => {
  const { pathname } = useLocation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={`页面不存在, 当前路由: ${pathname}`}
      extra={
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
