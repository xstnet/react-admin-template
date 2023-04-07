import { notification } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { getUserInfo } from '@/api';
import { validateToken } from '@/utils/jwt';
import PageLoading from '@/components/Loading/PageLoading';
import { GlobalContext } from '@/contexts/Global';
import { AxiosError } from 'axios';
import { SettingContext } from '@/contexts/Setting';
import './index.less';
import './fixed-layout.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SmallScreenNotify from '../components/SmallScreenNotify';
import MultitabLayout from '../multitab';
import SingleLaylut from '../single';
import { MenuContext } from '@/contexts/Menu';
import useThemeToken from '@/hooks/useThemeToken';

const GlobalLayout: React.FC = () => {
  const [getUserInfoLoading, setGetUserInfoLoading] = useState(true);
  const { setIsLogin, setUserInfo } = useContext(GlobalContext);

  const { colorBgContainer } = useThemeToken();
  const {
    settings: { multitabMode, fixedMenu, fixedHeader, theme }
  } = useContext(SettingContext);
  const { menuCollapsed } = useContext(MenuContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  console.log('global layout render...');

  useEffect(() => {
    if (!validateToken()) {
      // token 无效
      navigate('/login');
      return;
    }

    // 第一个接口必须要保成功
    getUserInfo()
      .then((data) => {
        setGetUserInfoLoading(false);
        setIsLogin(true);
        setUserInfo!(data);

        // 借助 gh-page 404.html的功能跳转回来, 解析路由并加载相应的页面
        if (searchParams.has('ghpage')) {
          const ghpage = decodeURIComponent(searchParams.get('ghpage')!);
          navigate(ghpage);
          return;
        }
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
    // 初次可能会无效, react-route推荐在组件渲染之后再进行跳转, 所以初次跳转方法放到了 useEffect中
    navigate('/login');
    return null;
  }

  if (getUserInfoLoading) {
    return <PageLoading title="页面加载中" loading={getUserInfoLoading} />;
  }
  return (
    <div
      data-fixed-menu={fixedMenu ? 1 : 0}
      data-menu-collapsed={menuCollapsed ? 1 : 0}
      data-fixed-header={fixedHeader ? 1 : 0}
      style={{ background: colorBgContainer }}
      className={`global-layout theme-${theme}`}
    >
      {multitabMode ? <MultitabLayout /> : <SingleLaylut />}
      <SmallScreenNotify />
    </div>
  );
};

export default GlobalLayout;
