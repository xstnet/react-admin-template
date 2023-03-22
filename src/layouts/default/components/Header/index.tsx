import { GlobalContext } from '@/contexts/Global';
import { Dropdown, Layout, theme, Space, MenuProps, Avatar, message } from 'antd';
import React, { useContext, useEffect } from 'react';
import {
  EditOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  GithubOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import './index.less';
import Iconfont from '@/components/Iconfont';
import Cache from '@/utils/cache';
import { toLoginPage } from '@/utils/util';
import { postLogout } from '@/api';
import { MenuContext } from '@/contexts/Menu';
import { SettingContext } from '@/contexts/Setting';

const Header: React.FC = () => {
  const { fullScreen, setFullScreen, userInfo, setUserInfo, setIsLogin } =
    useContext(GlobalContext);

  const { menuCollapsed, setMenuCollapsed } = useContext(MenuContext);
  const {
    settings: { theme: themeMode },
    setSetting
  } = useContext(SettingContext);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const handleFullScreen = () => {
    message.success(!fullScreen ? '进入全屏模式' : '已退出全屏模式');
    setFullScreen(!fullScreen);
  };

  const handleChangeTheme = () => {
    setSetting({ followSystemTheme: false, theme: themeMode === 'light' ? 'dark' : 'light' });
  };

  const renderLeftContent = () => {
    return (
      <div className="left">
        <div className="logo">
          <Iconfont type="icon-react" className="logo-img" />
          <span className="logo-text">React Admin Template</span>
        </div>
        <div>
          {React.createElement(menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => setMenuCollapsed(!menuCollapsed)
          })}
        </div>
      </div>
    );
  };
  const renderRightContent = () => {
    const renderIcons = () => {
      return (
        <>
          {/* 搜索按钮 */}
          <Iconfont title="搜索" type="icon-search" className="action-icon" />
          {/* 全屏按钮 */}
          {fullScreen ? (
            <FullscreenExitOutlined
              title="退出全屏模式"
              className="action-icon"
              onClick={handleFullScreen}
            />
          ) : (
            <FullscreenOutlined
              title="进入全屏模式"
              className="action-icon"
              onClick={handleFullScreen}
            />
          )}

          {/* Github */}
          <a
            target="_blank"
            className="action-icon"
            title="Go to Github"
            href="https://github.com/xstnet/react-admin-template"
            rel="norefer noopener"
          >
            <GithubOutlined />
          </a>
          {themeMode === 'dark' ? (
            <Iconfont
              onClick={handleChangeTheme}
              title="主题-深色模式"
              type="icon-theme-dark"
              className="action-icon"
            />
          ) : (
            <Iconfont
              onClick={handleChangeTheme}
              title="主题-明亮模式"
              type="icon-theme-light"
              className="action-icon"
            />
          )}

          <Iconfont title="设置" type="icon-setting" className="action-icon" />
        </>
      );
    };
    const items: MenuProps['items'] = [
      {
        label: <a>个人中心</a>,
        icon: <UserOutlined />,
        key: 'userCenter'
      },
      {
        label: <a>修改资料</a>,
        key: 'update',
        icon: <EditOutlined />
      },
      {
        type: 'divider'
      },
      {
        label: '退出',
        icon: <LogoutOutlined />,
        key: 'logout',
        onClick: () => {
          postLogout().then(() => {
            Cache.removeToken();
            setIsLogin(false);
            setUserInfo(null);
            toLoginPage();
          });
        }
      }
    ];

    return (
      <div className="right">
        <Space size="middle">
          {renderIcons()}

          <Dropdown menu={{ items }}>
            <Space className="pointer">
              <span>{userInfo?.nickname}</span>
              <Avatar src={userInfo?.avatar} />
            </Space>
          </Dropdown>
        </Space>
      </div>
    );
  };
  return (
    <Layout.Header
      className="header"
      style={{
        background: colorBgContainer
      }}
    >
      <>
        {renderLeftContent()}
        {renderRightContent()}
      </>
    </Layout.Header>
  );
};

export default React.memo(Header);
