import { MenuContext } from '@/contexts/Menu';
import { SettingContext } from '@/contexts/Setting';
import useThemeToken from '@/hooks/useThemeToken';
import { Layout } from 'antd';
import { useContext } from 'react';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MultitabLeftSider from '../components/MultitabLeftSider/Index';
import Breadcrumb from '../components/Breadcrumb';
import Tabs from '../components/Tabs';
import MultitabProvider from '@/contexts/Multitab';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');

  return (
    <MultitabProvider>
      <Layout>
        <Header />
        <Layout>
          <MultitabLeftSider />
          <Layout className="content-layout">
            <Tabs />

            <Breadcrumb />
            {/* <Content /> */}
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </MultitabProvider>
  );
};

export default MultitabLayout;
