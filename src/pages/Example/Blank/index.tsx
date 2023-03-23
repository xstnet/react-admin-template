import ContentBox from '@/components/ContextBox';
import { Typography } from 'antd';

interface IProps {
  title?: string;
}
const BlankPage: React.FC<IProps> = ({ title = '空白页' }) => {
  return (
    <ContentBox style={{ height: '500px' }}>
      <Typography.Title level={4}>{title}</Typography.Title>
    </ContentBox>
  );
};

export default BlankPage;
