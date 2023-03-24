import ContentBox from '@/components/ContextBox';
import { Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage: React.FC<KV> = () => {
  const location = useLocation();

  return (
    <ContentBox style={{}}>
      <Typography.Title>404</Typography.Title>
      <Typography.Paragraph>页面不存在</Typography.Paragraph>

      <Typography.Paragraph>路由: {location.pathname}</Typography.Paragraph>

      <Link to="/">回到首页</Link>
    </ContentBox>
  );
};

export default NotFoundPage;
