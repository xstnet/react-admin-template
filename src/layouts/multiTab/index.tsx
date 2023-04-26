import { Layout } from 'antd';
import Content from './components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';
import MultitabProvider from '@/contexts/Multitab';
import React from 'react';
import './index.less';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');

  return (
    <MultitabProvider>
      <Layout className="multitab-layout">
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
