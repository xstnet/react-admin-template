import { Layout, notification, theme } from 'antd';
import LeftSider from './components/LeftSider/Index';
import DefaultRoutes from '@/routes';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import { useContext, useEffect, useState } from 'react';

import { toLoginPage } from '@/utils/util';
import { getUserInfo } from '@/api';
import './index.less';
import { validateToken } from '@/utils/jwt';
import PageLoading from '@/components/Loading/PageLoading';
import { GlobalContext } from '@/contexts/Global';
import { AxiosError } from 'axios';
const { Content } = Layout;

const DefaultLayout: React.FC = () => {
  const [getUserInfoLoading, setGetUserInfoLoading] = useState(true);
  const { setIsLogin, setUserInfo } = useContext(GlobalContext);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  useEffect(() => {
    if (!validateToken()) {
      // token 无效
      toLoginPage();
    }

    // 第一个接口必须要保成功
    getUserInfo()
      .then((data) => {
        setGetUserInfoLoading(false);
        setIsLogin(true);
        setUserInfo!(data);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          notification.error({
            message: '网络错误',
            description: '获取用户信息失败, 无法打开页面',
            duration: null,
            closeIcon: null
          });
        }
      });
  }, []);

  console.log('default layout render...');

  if (getUserInfoLoading) {
    return <PageLoading title="页面加载中" loading={getUserInfoLoading} />;
  }
  return (
    <Layout style={{ background: colorBgContainer }} className="default-layout">
      <Header />

      <Layout>
        <LeftSider />
        <Layout className="content-layout">
          <Breadcrumb />
          <Content className="content">
            Content |
            <DefaultRoutes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
