import React, { lazy, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
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
import { spawn } from 'child_process';
import LeftSider from './components/LeftSider/Index';

const DashboardPage = lazy(() => import('@page/Dashboard'));
const LoginPage = lazy(() => import('@page/Login'));

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout className="default-layout">
      <Sider trigger={null} className="left-sider" collapsible collapsed={collapsed}>
        <LeftSider />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            background: colorBgContainer
          }}>
          <>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              onClick: () => setCollapsed(!collapsed)
            })}

            <NavLink to="/login">login </NavLink>
            <NavLink to="/dashboard">-&gt;dashboard</NavLink>
          </>
        </Header>
        <Content
          className="content"
          style={{
            background: colorBgContainer
          }}>
          Content
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<span>error</span>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
