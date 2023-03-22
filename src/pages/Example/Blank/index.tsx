import { Typography } from 'antd';

interface IProps {
  title?: string;
}
const BlankPage: React.FC<IProps> = ({ title = '空白页' }) => {
  return (
    <div>
      <div className="content-box" style={{ height: '500px' }}>
        <Typography.Title level={4}>{title}</Typography.Title>
      </div>
    </div>
  );
};

export default BlankPage;
