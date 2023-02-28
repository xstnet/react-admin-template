import { Layout } from 'antd';
import LeftSider from './components/LeftSider/Index';
import DefaultRoutes from '@/routes';
import Header from './components/Header';
import { useEffect } from 'react';
import Cache from '@/utils/cache';
import Config from '@/configs';

import './index.less';
import { toLoginPage } from '@/utils/util';
const { Content } = Layout;

const DefaultLayout: React.FC = () => {
  useEffect(() => {
    const token = Cache.getString(Config.tokenKey);
    console.log('token', token);

    if (!token) {
      toLoginPage();
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
