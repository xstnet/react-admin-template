import { Layout } from 'antd';
import Content from './components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from './components/LeftSider/Index';
import Breadcrumb from './components/Breadcrumb';
import Tabs from './components/Tabs';
import MultitabProvider from '@/contexts/Multitab';
import { Outlet, useLocation } from 'react-router-dom';
import { KeepAlive } from '@/components/KeepAlive';
import React from 'react';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');
  const { pathname } = useLocation();

  return (
    <MultitabProvider>
      <Layout className="multitab-layout">
        <Header />
        <Layout>
          <LeftSider />
          <Layout className="content-layout">
            <Tabs />
            <Breadcrumb />
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </MultitabProvider>
  );
};

export default React.memo(MultitabLayout);
