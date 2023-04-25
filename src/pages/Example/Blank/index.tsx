import ContentBox from '@/components/ContextBox';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
  title?: string;
}
const BlankPage: React.FC<IProps> = ({ title = '空白页' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('BlankPage: 初次渲染');
    return () => {
      console.log('BlankPage: 被卸载了');
    };
  }, []);
  return (
    <ContentBox style={{ height: '500px' }}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>Count: {count}</Typography.Text>
      <br />
      <Button onClick={(e) => setCount((v) => v + 1)}>add</Button>
    </ContentBox>
  );
};

export default BlankPage;
