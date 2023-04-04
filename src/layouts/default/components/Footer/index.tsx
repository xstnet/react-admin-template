import { SettingContext } from '@/contexts/Setting';
import { GithubFilled } from '@ant-design/icons';
import { Layout, Typography } from 'antd';
import { useContext } from 'react';

const Footer = () => {
  const {
    settings: { showFooter }
  } = useContext(SettingContext);

  const { Text, Link } = Typography;

  if (!showFooter) {
    return null;
  }

  return (
    <Layout.Footer style={{ textAlign: 'center', paddingBottom: 4 }}>
      <Text type="secondary">
        React Admin Template
        <Link
          href="https://github.com/xstnet/react-admin-template"
          target="_blank"
          style={{ color: 'inherit', marginLeft: 5 }}
        >
          <GithubFilled />
        </Link>
      </Text>
      <br />
      <Link href="https://github.com/xstnet" target="_blank">
        <Text type="secondary">醉丶春风</Text>
      </Link>
      <Text type="secondary">©2023 Created by Ant Design V5</Text>
    </Layout.Footer>
  );
};

export default Footer;
