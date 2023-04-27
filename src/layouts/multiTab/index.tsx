import { Layout } from 'antd';
import Content from './components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';
import MultitabProvider from '@/contexts/Multitab';
import React, { useContext } from 'react';
import './index.less';
import { MenuContext } from '@/contexts/Menu';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');
  const { menuCollapsed } = useContext(MenuContext);

  return (
    <MultitabProvider>
      <Layout className="multitab-layout" data-menu-collapsed={menuCollapsed ? 1 : 0}>
        <Header />
        <Layout>
          <LeftSider />
          <Layout className="content-layout">
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </MultitabProvider>
  );
};

export default React.memo(MultitabLayout);
