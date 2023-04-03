import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import VisitLineChart from './components/VisitLineChart';
const data01 = [
  { name: '视频类', value: 400 },
  { name: '图文类', value: 300 },
  { name: '资讯类', value: 300 }
];

const data02 = [
  { name: 'Group A1', value: 2400 },
  { name: 'Group B1', value: 4567 },
  { name: 'Group C1', value: 1398 },
  { name: 'Group D1', value: 9800 },
  { name: 'Group E1', value: 3908 },
  { name: 'Group F1', value: 4800 }
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
          <Col span={18}>
            <VisitLineChart />
          </Col>
          <Col span={6}>
            <Card title="内容占比">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {data01.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <VisitLineChart />
          </Col>
          <Col span={12}>
            <Card>登录历史</Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardPage;
