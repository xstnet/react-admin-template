import React, { useContext, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';

import './index.less';
import LeftSider from './components/LeftSider/Index';
import DefaultRoutes from '@/routes';
import { GlobalContext } from '@/contexts/Global';
import Header from './components/Header';

const { Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { menuCollapsed } = useContext(GlobalContext);

  useEffect(() => {
    console.log('menuCollapsed', menuCollapsed);
  }, [menuCollapsed]);

  return (
    <Layout className="default-layout">
      <Sider trigger={null} className="left-sider" collapsible collapsed={menuCollapsed}>
        <LeftSider />
      </Sider>
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
