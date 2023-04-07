import { GithubOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const GithubIcon: React.FC<{}> = () => {
  return (
    <Typography.Link
      className="action-icon"
      target="_blank"
      style={{ color: 'inherit' }}
      href="https://github.com/xstnet/react-admin-template"
    >
      <GithubOutlined />
    </Typography.Link>
  );
};

export default GithubIcon;
