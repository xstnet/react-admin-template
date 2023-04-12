import { Layout } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';
import DefaultRoutes from '@/routes';
import { Outlet } from 'react-router-dom';

const SingleLaylut = () => {
  console.log('SingleLaylut render...');
  //   DefaultRoutes;
  return (
    <Layout className="single-tab-layout">
      <Header />
      <Layout>
        <LeftSider />
        <Layout className="content-layout">
          <Breadcrumb />
          <Content>
            <DefaultRoutes />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SingleLaylut;
