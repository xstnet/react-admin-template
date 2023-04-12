import { Layout } from 'antd';
import Content from './components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from './components/LeftSider/Index';
import Breadcrumb from './components/Breadcrumb';
import Tabs from './components/Tabs';
import MultitabProvider from '@/contexts/Multitab';
import DefaultRoutes from '@/routes';

const MultitabLayout = () => {
  console.log('MultitabLayout render...');

  return (
    <MultitabProvider>
      <Layout className="multitab-layout">
        <Header />
        <Layout>
          <LeftSider />
          <Layout className="content-layout">
            <Tabs />
            <Content>
              <Breadcrumb />

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
