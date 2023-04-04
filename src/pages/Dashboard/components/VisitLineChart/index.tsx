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
  const chartColor = {
    pv: { stroke: '#8884d8', fill: '#b5b1e6' },
    ip: { stroke: '#00b96b', fill: '#82ca9d' }
  };
  const visitData = Array.from({ length: 7 })
    .map((_, i) => ({
      name: dayjs()
        .subtract(i + 1, 'day')
        .format('MM-DD'),
      pv: randomNumber(1000, 10000),
      ip: randomNumber(100, 1000)
    }))
    .reverse();

  return (
    <Card activeTabKey={activeTab} onTabChange={(key) => setActiveTab(key)} tabList={tabList}>
      <ResponsiveContainer width={'100%'} height={300}>
        <AreaChart data={visitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip wrapperStyle={{ outline: 'none' }} />
          <Area
            type="monotone"
            strokeWidth={2}
            dataKey={activeTab}
            stroke={chartColor[activeTab as 'pv'].stroke}
            fill={chartColor[activeTab as 'pv'].fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VisitLineChart;
