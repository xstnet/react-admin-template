import { List, Tabs, TabsProps, Avatar } from 'antd';
interface IProps {}
const NotifyCard: React.FC<IProps> = () => {
  const renderNotifyTab = () => {
    const data = [
      {
        title: '您有一封新的邮件'
      },
      {
        title: '您有3个订单待支付'
      },
      {
        title: '张三 的请假申请需要您的审批'
      },
      {
        title: '本周周报待填写'
      }
    ];

    return (
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="3天前"
            />
          </List.Item>
        )}
      />
    );
  };
  const renderMessageTab = () => {
    const data = [
      {
        title: '张三 评论了你',
        desc: '评论内容评论内容评论内容评论内容'
      },
      {
        title: '您有3个订单待支付',
        desc: '评论内容评论内容评论内容评论内容'
      },
      {
        title: '张三 的请假申请需要您的审批',
        desc: '评论内容评论内容评论内容评论内容'
      },
      {
        title: '本周周报待填写',
        desc: '评论内容评论内容评论内容评论内容'
      }
    ];

    return (
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.desc}
            />
          </List.Item>
        )}
      />
    );
  };
  const tabItems: TabsProps['items'] = [
    {
      key: 'notify',
      label: `通知(3)`,
      children: renderNotifyTab()
    },
    {
      key: 'message',
      label: `消息(4)`,
      children: renderMessageTab()
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
      />
    </>
  );
};

export default NotifyCard;
