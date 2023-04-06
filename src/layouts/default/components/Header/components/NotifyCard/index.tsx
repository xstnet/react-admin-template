import Iconfont from '@/components/Iconfont';
import { List, Tabs, TabsProps, Avatar, Button, Space, Divider } from 'antd';
import MessageTab from './MessageTab';
import NotifyTab from './NotifyTab';
interface IProps {}
const NotifyCard: React.FC<IProps> = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'notify',
      label: `通知(3)`,
      children: <NotifyTab />
    },
    {
      key: 'message',
      label: `消息(4)`,
      children: <MessageTab />
    }
  ];

  return (
    <>
      <Tabs
        centered
        style={{ width: 300 }}
        defaultActiveKey="notify"
        items={tabItems}
        onChange={undefined}
        tabBarExtraContent={
          <Button type="link" style={{ marginRight: 10 }}>
            清空
          </Button>
        }
      />
      <Divider style={{ margin: '8px 0' }} />
      <Space
        split={<Divider type="vertical" />}
        style={{ width: '100%', justifyContent: 'center', marginBottom: 0 }}
      >
        <Button type="link">全部已读</Button>
        <Button type="link">查看更多</Button>
      </Space>
    </>
  );
};

export default NotifyCard;
