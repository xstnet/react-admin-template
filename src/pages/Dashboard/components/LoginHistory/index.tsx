import RelativeTime from '@/components/RelativeTime';
import { DayjsFormatEnum } from '@/constants/enum';
import { randomNumber } from '@/utils/util';
import { Card } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const LoginHistory: React.FC<{}> = () => {
  const columns: ColumnsType<Model.LoginHistory> = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '登录IP',
      dataIndex: 'loginIp',
      key: 'loginIp'
    },
    {
      title: '登录时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (create_time) => {
        return <RelativeTime time={create_time} />;
      }
    }
  ];

  // 使用相同数据构造数组, 此时没有有效的key
  const data: Model.LoginHistory[] = Array(5).fill({
    id: randomNumber(10, 100000),
    userId: 1,
    loginIp: '127.0.0.1',
    nickname: 'admin',
    create_time: dayjs().subtract(3, 'second').format(DayjsFormatEnum.second)
  });

  return (
    <Card title="登录历史" extra={<Link to="/">查看更多</Link>}>
      <Table
        rowKey={() => randomNumber(10, 100000)}
        pagination={false}
        size="small"
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export default LoginHistory;
