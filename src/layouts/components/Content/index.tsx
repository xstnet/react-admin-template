// import DefaultRoutes from '@/routes';
import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';
import './index.less';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  console.log('Tab Wrap Content render...');

  // DefaultRoutes();
  return <Layout.Content className="content">{children}</Layout.Content>;
};

export default React.memo(Content);
