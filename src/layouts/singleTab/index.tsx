import { Layout } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';
import { Outlet } from 'react-router-dom';
import './index.less';
import { useContext } from 'react';
import { MenuContext } from '@/contexts/Menu';

const SingleLaylut = () => {
  console.log('SingleLaylut render...');
  const { menuCollapsed } = useContext(MenuContext);
  return (
    <Layout className="single-tab-layout" data-menu-collapsed={menuCollapsed ? 1 : 0}>
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
