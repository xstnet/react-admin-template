import React, { useContext } from 'react';
import { Layout, theme } from 'antd';
import MenuList from './MenuList';
import { MenuContext } from '@/contexts/Menu';

const LeftSider: React.FC = () => {
  const { menuCollapsed } = useContext(MenuContext);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout.Sider
      style={{ background: colorBgContainer }}
      trigger={null}
      className="left-sider"
      collapsible
      collapsed={menuCollapsed}
    >
      <MenuList />
    </Layout.Sider>
  );
};

export default LeftSider;
