import { Layout, notification, theme } from 'antd';
import LeftSider from './components/LeftSider/Index';
import Header from './components/Header';
import Content from './components/Content';
import Breadcrumb from './components/Breadcrumb';
import { useContext, useEffect, useState } from 'react';

import { toLoginPage } from '@/utils/util';
import { getUserInfo } from '@/api';
import { validateToken } from '@/utils/jwt';
import PageLoading from '@/components/Loading/PageLoading';
import { GlobalContext } from '@/contexts/Global';
import useThemeToken from '@/hooks/useThemeToken';
import { AxiosError } from 'axios';
import { SettingContext } from '@/contexts/Setting';
import './index.less';
import './fixed-layout.less';
import { MenuContext } from '@/contexts/Menu';

const DefaultLayout: React.FC = () => {
  const [getUserInfoLoading, setGetUserInfoLoading] = useState(true);
  const { setIsLogin, setUserInfo } = useContext(GlobalContext);
  const { menuCollapsed } = useContext(MenuContext);
  const { colorBgContainer } = useThemeToken();
  const {
    settings: { fixedMenu, fixedHeader }
  } = useContext(SettingContext);

  useEffect(() => {
    if (!validateToken()) {
      // token 无效
      return;
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

  if (!validateToken()) {
    // token 无效
    toLoginPage();
    return <></>;
  }

  console.log('default layout render...');

  if (getUserInfoLoading) {
    return <PageLoading title="页面加载中" loading={getUserInfoLoading} />;
  }
  return (
    <Layout
      data-fixed-menu={fixedMenu ? 1 : 0}
      data-menu-collapsed={menuCollapsed ? 1 : 0}
      data-fixed-header={fixedHeader ? 1 : 0}
      style={{ background: colorBgContainer }}
      className="default-layout"
    >
      <Header />

      <Layout>
        <LeftSider />
        <Layout className="content-layout">
          <Breadcrumb />
          <Content />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
