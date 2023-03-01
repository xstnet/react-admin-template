import { GlobalContext } from '@/contexts/Global';
import { Dropdown, Layout, theme, Space, MenuProps, Avatar } from 'antd';
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

const Header: React.FC = () => {
  const {
    menuCollapsed,
    setMenuCollapsed,
    fullScreen,
    setFullScreen,
    userInfo,
    setUserInfo,
    setIsLogin
  } = useContext(GlobalContext);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
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
            rel="norefer noopener">
            <GithubOutlined />
          </a>

          <Iconfont title="主题-明亮" type="icon-theme-light" className="action-icon" />
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
            setUserInfo(null);
            setIsLogin(false);
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
      }}>
      <>
        {renderLeftContent()}
        {renderRightContent()}
      </>
    </Layout.Header>
  );
};

export default Header;
