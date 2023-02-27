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
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';

import './index.less';
import Iconfont from '@/components/Iconfont';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { menuCollapsed, setMenuCollapsed, fullScreen, setFullScreen } = useContext(GlobalContext);
  useEffect(() => {
    console.log('menuCollapsed2', menuCollapsed);
  }, [menuCollapsed]);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const renderLeftContent = () => {
    return (
      <div>
        {React.createElement(menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          onClick: () => setMenuCollapsed(!menuCollapsed)
        })}
      </div>
    );
  };
  const renderRightContent = () => {
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
        key: 'logout'
      }
    ];

    return (
      <div className="right">
        <Space size="large">
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
            style={{ color: 'inherit' }}
            title="Go to Github"
            href="https://github.com/xstnet/react-admin-template"
            rel="norefer noopener">
            <GithubOutlined />
          </a>
          <Dropdown menu={{ items }}>
            <Space className="pointer">
              <a style={{ color: '#333' }} onClick={(e) => e.preventDefault()}>
                醉丶春风
              </a>
              <Avatar src="https://www.xstnet.com/static/images/head.gif" />
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
