import React, { useContext } from 'react';
import { Layout } from 'antd';
import MenuList from './MenuList';
import { MenuContext } from '@/contexts/Menu';
import useThemeToken from '@/hooks/useThemeToken';
import './index.less';

const LeftSider: React.FC = () => {
  const { menuCollapsed } = useContext(MenuContext);
  const { colorBgContainer } = useThemeToken();

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
