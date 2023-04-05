import { GlobalContext } from '@/contexts/Global';
import { Dropdown, Layout, theme, Space, MenuProps, Avatar } from 'antd';
import React, { useContext } from 'react';
import {
  EditOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import './index.less';
import Iconfont from '@/components/Iconfont';
import Cache from '@/utils/cache';
import { postLogout } from '@/api';
import { MenuContext } from '@/contexts/Menu';
import { useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  GithubIcon,
  FullScreenIcon,
  ThemeIcon,
  NotifyIcon,
  SettingIcon
} from './components/icons';

const Header: React.FC = () => {
  const { userInfo, setUserInfo, setIsLogin } = useContext(GlobalContext);

  const { menuCollapsed, setMenuCollapsed } = useContext(MenuContext);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const navigate = useNavigate();

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
          <SearchIcon />
          <NotifyIcon />
          <FullScreenIcon />
          <GithubIcon />
          <ThemeIcon />
          <SettingIcon />
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
            navigate('/login');
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
