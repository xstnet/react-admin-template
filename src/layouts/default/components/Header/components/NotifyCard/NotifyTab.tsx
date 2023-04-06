import Iconfont from '@/components/Iconfont';
import { List } from 'antd';
interface IProps {}
const NotifyTab: React.FC<IProps> = () => {
  const data = [
    {
      title: '您有一封新的邮件',
      type: 'mail'
    },
    {
      title: '您有3个订单待支付',
      type: 'payment'
    },
    {
      title: '张三 的请假申请需要您的审批',
      type: 'workflow'
    },
    {
      title: '本周周报待填写',
      type: 'common'
    }
  ];

  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Iconfont style={{ fontSize: 30 }} type={`icon-${item.type}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="3天前"
          />
        </List.Item>
      )}
    />
  );
};

export default NotifyTab;
