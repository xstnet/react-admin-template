// import DefaultRoutes from '@/routes';
import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';
import './index.less';
import { Outlet } from 'react-router-dom';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  console.log('Content render...');
  console.log('childdddddddd', children);

  // DefaultRoutes();
  return <Layout.Content className="content">{children}</Layout.Content>;
};

export default React.memo(Content);
