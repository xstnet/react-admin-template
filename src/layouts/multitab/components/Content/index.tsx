// import DefaultRoutes from '@/routes';
import { MenuContext } from '@/contexts/Menu';
import { MultitabContext } from '@/contexts/Multitab';
import { CloseOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import KeepAlive from '../KeepAlive';
import Tabs from '../Tabs';
import './index.less';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  console.log('multitab Content render...');
  const location = useLocation();
  const { addTab, activeTab, hasTab, openTab } = useContext(MultitabContext);
  const { mapPathToMenu } = useContext(MenuContext);
  const { pathname } = location;

  const handleAddTab = () => {
    console.log('handleAddTab');

    const menuItem = mapPathToMenu.get(pathname);
    if (!menuItem || !menuItem.path) {
      return;
    }
    // 标签已存在, 切换
    if (hasTab(menuItem.key!) && activeTab !== menuItem.key) {
      openTab(menuItem.key!);
      return;
    }
    addTab({
      label: menuItem.label,
      key: menuItem.key!,
      children: null
    });
  };

  useEffect(() => {
    handleAddTab();
  }, [location]);

  useEffect(() => {
    return () => {
      console.log('content destory');
    };
  }, []);

  return (
    <Layout.Content className="content">
      <KeepAlive />
    </Layout.Content>
  );
};

export default React.memo(Content);
