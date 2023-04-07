import { MenuContext } from '@/contexts/Menu';
import { SettingContext } from '@/contexts/Setting';
import useThemeToken from '@/hooks/useThemeToken';
import { Layout } from 'antd';
import { useContext } from 'react';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';
import Breadcrumb from '../components/Breadcrumb';
import Tabs from '../components/Tabs';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');

  return (
    <Layout>
      <Header />
      <Layout>
        <LeftSider />
        <Layout className="content-layout">
          <Tabs />

          <Breadcrumb />
          {/* <Content /> */}
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MultitabLayout;
