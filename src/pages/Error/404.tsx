import ContentBox from '@/components/ContextBox';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage: React.FC<KV> = () => {
  const location = useLocation();

  return (
    <ContentBox style={{}}>
      <div
        style={{
          fontSize: '40px',
          color: 'rgba(0,0,0,.6)'
        }}
      >
        404
      </div>
      <br />
      <div>页面不存在~</div>
      <br />
      <div>路由: {location.pathname}</div>
      <br />
      <br />
      <Link to="/">回到首页</Link>
    </ContentBox>
  );
};

export default NotFoundPage;
