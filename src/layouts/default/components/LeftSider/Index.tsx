import React, { useContext } from 'react';
import { Layout } from 'antd';
import MenuList from './MenuList';
import { GlobalContext } from '@/contexts/Global';

const LeftSider: React.FC = () => {
  const { menuCollapsed } = useContext(GlobalContext);

  return (
    <Layout.Sider trigger={null} className="left-sider" collapsible collapsed={menuCollapsed}>
      <div className="logo" />
      <MenuList />
    </Layout.Sider>
  );
};

export default LeftSider;
