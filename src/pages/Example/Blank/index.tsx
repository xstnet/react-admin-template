import { Typography } from 'antd';

const BlankPage: React.FC<any> = () => {
  return (
    <div>
      <div className="content-box" style={{ height: '500px' }}>
        <Typography.Title level={4}>空白页</Typography.Title>
      </div>
    </div>
  );
};

export default BlankPage;
