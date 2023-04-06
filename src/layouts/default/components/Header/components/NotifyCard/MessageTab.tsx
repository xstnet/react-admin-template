import RelativeTime from '@/components/RelativeTime';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, List, Typography } from 'antd';
interface IProps {}
const MessageTab: React.FC<IProps> = () => {
  const data = [
    {
      title: '张三 评论了你',
      desc: '评论内容评论内容评论内容',
      createTime: '2023-04-06 15:39:00'
    },
    {
      title: '您有3个订单待支付',
      desc: '订单1,订单2,订单3',
      createTime: '2023-04-05 15:39:00'
    },
    {
      title: '张三 的请假申请需要您的审批',
      desc: '',
      createTime: '2023-04-01 12:08:00'
    },
    {
      title: '本周周报待填写',
      createTime: '2023-03-02 10:55:00',
      desc: '说明'
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
            avatar={<Avatar size={48} icon={<UserOutlined />} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description={
              <div>
                {item.desc}
                {item.desc && <br />}

                <Typography.Text>
                  <RelativeTime style={{ fontSize: 12 }} time={item.createTime} />
                </Typography.Text>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default MessageTab;
