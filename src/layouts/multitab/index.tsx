import { Layout } from 'antd';
import Content from './components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from './components/LeftSider/Index';
import Breadcrumb from '../components/Breadcrumb';
import Tabs from './components/Tabs';
import MultitabProvider from '@/contexts/Multitab';
import DefaultRoutes from '@/routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');

  return (
    <MultitabProvider>
      <Layout>
        <Header />
        <Layout>
          <LeftSider />
          <Layout className="content-layout">
            <Tabs />
            <Breadcrumb />
            <Content>
              <DefaultRoutes />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </MultitabProvider>
  );
};

export default MultitabLayout;
