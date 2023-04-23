import { Layout } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';
import { Outlet } from 'react-router-dom';
import './index.less';

const SingleLaylut = () => {
  console.log('SingleLaylut render...');
  return (
    <Layout className="single-tab-layout">
      <Header />
      <Layout>
        <LeftSider />
        <Layout className="content-layout">
          <Breadcrumb />
          <Content>
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SingleLaylut;
