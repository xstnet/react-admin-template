import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { MenuList } from '@/configs/menu';

import './index.less';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout className="default-layout">
      <Sider trigger={null} className="left-sider" collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={MenuList} />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            background: colorBgContainer
          }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => setCollapsed(!collapsed)
          })}
        </Header>
        <Content
          className="content"
          style={{
            background: colorBgContainer
          }}>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
