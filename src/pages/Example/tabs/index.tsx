import ContentBox from '@/components/ContextBox';
import { MultitabContext } from '@/contexts/Multitab';
import { Button, Space, Divider } from 'antd';
import { useContext } from 'react';

const TabsPage: React.FC<{}> = () => {
  // const { removeTab, tabsRef } = useContext(MultitabContext);
  const handleCloseLeftTabs = () => {};
  return (
    <ContentBox>
      <Space>
        <Button>打开控制台标签页</Button>
        <Button>打开发布文章标签</Button>
        <Button>编辑文章ID: 1</Button>
        <Button>编辑文章ID: 2</Button>
      </Space>
      <Divider />
      <Space>
        <Button>关闭第二个标签页</Button>
        <Button>关闭左侧标签页</Button>
        <Button>关闭右侧标签页</Button>
        <Button>关闭其他标签页</Button>
      </Space>
    </ContentBox>
  );
};

export default TabsPage;
