import ContentBox from '@/components/ContextBox';
import { Button, Typography } from 'antd';
import { useState } from 'react';

interface IProps {
  title?: string;
}
const BlankPage: React.FC<IProps> = ({ title = '空白页' }) => {
  const [count, setCount] = useState(0);
  return (
    <ContentBox style={{ height: '500px' }}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <span>count: {count}</span>
      <br />
      <Button onClick={(e) => setCount((v) => v + 1)}>add</Button>
    </ContentBox>
  );
};

export default BlankPage;
