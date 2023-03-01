import React, { useContext } from 'react';
import { Layout, theme } from 'antd';
import MenuList from './MenuList';
import { GlobalContext } from '@/contexts/Global';

const LeftSider: React.FC = () => {
  const { menuCollapsed } = useContext(GlobalContext);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout.Sider
      style={{ background: colorBgContainer }}
      trigger={null}
      className="left-sider"
      collapsible
      collapsed={menuCollapsed}>
      <MenuList />
    </Layout.Sider>
  );
};

export default LeftSider;
