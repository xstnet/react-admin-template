import { GlobalContext } from '@/contexts/Global';
import { Layout, theme } from 'antd';
import React, { useContext, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const Header: React.FC = (prps) => {
  const { menuCollapsed, setMenuCollapsed } = useContext(GlobalContext);
  useEffect(() => {
    console.log('menuCollapsed2', menuCollapsed);
  }, [menuCollapsed]);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout.Header
      className="header"
      style={{
        background: colorBgContainer
      }}>
      <>
        {React.createElement(menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          onClick: () => setMenuCollapsed(!menuCollapsed)
        })}
      </>
    </Layout.Header>
  );
};

export default Header;
