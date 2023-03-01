import DefaultRoutes from '@/routes';
import { Layout } from 'antd';
import './index.less';

const Header: React.FC = () => {
  return (
    <Layout.Content className="content">
      <DefaultRoutes />
    </Layout.Content>
  );
};

export default Header;
