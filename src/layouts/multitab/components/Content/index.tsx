// import DefaultRoutes from '@/routes';
import { MenuContext } from '@/contexts/Menu';
import { MultitabContext } from '@/contexts/Multitab';
import { Layout } from 'antd';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.less';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  console.log('Content render...');
  console.log('childdddddddd', children);
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
    addTab({ label: menuItem.label, key: menuItem.key!, children });
  };

  useEffect(() => {
    console.log('locationxxxxx');

    handleAddTab();
    return () => {
      console.log('content destory');
    };
  }, [location]);

  // DefaultRoutes();
  //   return <Layout.Content className="content">{children}</Layout.Content>;
  return null;
};

export default React.memo(Content);
