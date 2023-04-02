import { randomNumber } from '@/utils/util';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const VisitLineChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pv');
  const tabList = [
    { tab: '访问量', key: 'pv' },
    { tab: 'IP', key: 'ip' }
  ];
  const visitData = Array.from({ length: 7 }).map((_, i) => ({
    name: dayjs()
      .subtract(i + 1, 'day')
      .format('MM-DD'),
    pv: randomNumber(1000, 10000),
    ip: randomNumber(100, 1000)
  }));

  return (
    <Card activeTabKey={activeTab} onTabChange={(key) => setActiveTab(key)} tabList={tabList}>
      <ResponsiveContainer width={'100%'} height={200}>
        <AreaChart data={visitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={activeTab} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VisitLineChart;
