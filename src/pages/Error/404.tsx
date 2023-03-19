import { Link, useLocation } from 'react-router-dom';

const NotFoundPage: React.FC<KV> = () => {
  const location = useLocation();

  return (
    <div className="content-box" style={{}}>
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
    </div>
  );
};

export default NotFoundPage;
