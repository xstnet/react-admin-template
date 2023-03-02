import DefaultRoutes from '@/routes';
import { Layout } from 'antd';
import React from 'react';
import './index.less';

const Content: React.FC = () => {
  return (
    <Layout.Content className="content">
      <DefaultRoutes />
    </Layout.Content>
  );
};

export default React.memo(Content);
