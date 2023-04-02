import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

import VisitLineChart from './components/VisitLineChart';

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
          <Col span={12}>
            <VisitLineChart />
          </Col>
          <Col span={12}>
            <Card>待定</Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardPage;
