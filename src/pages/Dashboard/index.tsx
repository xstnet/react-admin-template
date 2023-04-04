import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import LoginHistory from './components/LoginHistory';
import TodoList from './components/TodoList';
import VisitLineChart from './components/VisitLineChart';

const data01 = [
  { name: '视频类', value: 400 },
  { name: '图文类', value: 300 },
  { name: '资讯类', value: 300 }
];

const DashboardPage: React.FC = () => {
  return (
    <>
      <div>
        <Row gutter={24}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic title="今日销售额" value={126560} precision={2} prefix="$" />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="示例指标"
                value={11.28}
                precision={2}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="示例指标"
                value={11.28}
                precision={2}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="示例指标"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={18} style={{ height: 300 }}>
            <VisitLineChart />
          </Col>
          <Col span={6}>
            <Card title="内容占比">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {data01.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]}
                      />
                    ))}
                  </Pie>

                  <Tooltip wrapperStyle={{ outline: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <TodoList />
          </Col>
          <Col span={12}>
            <LoginHistory />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardPage;
