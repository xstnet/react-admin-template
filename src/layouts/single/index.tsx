import { Layout,  } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftSider from '../components/LeftSider/Index';

const SingleLaylut = () => {
  console.log('SingleLaylut render...');

  return (
    <Layout>
      <Header />
      <Layout>
        <LeftSider />
        <Layout className="content-layout">
          <Breadcrumb />
          <Content />
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SingleLaylut;
