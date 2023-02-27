import { Layout, theme } from 'antd';

import LeftSider from './components/LeftSider/Index';
import DefaultRoutes from '@/routes';
import Header from './components/Header';
import './index.less';
import { useEffect } from 'react';
import Cache from '@/utils/cache';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cache.getString('token');
    console.log('token', token);

    if (!token) {
      navigate('/login');
    }
  }, []);

  // todo: get user detail
  // todo: return loading

  return (
    <Layout className="default-layout">
      <LeftSider />
      <Layout>
        <Header />
        {/* style={{
            background: colorBgContainer
          }} */}
        <Content className="content">
          Content |
          <DefaultRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
