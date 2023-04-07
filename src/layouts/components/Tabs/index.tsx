import { SettingContext } from '@/contexts/Setting';
import { Tabs as AntdTabs } from 'antd';
import { useContext } from 'react';
import Content from '../Content';
import './index.less';

const Tabs = () => {
  const {
    settings: { showFooter }
  } = useContext(SettingContext);

  if (!showFooter) {
    return null;
  }

  return (
    <AntdTabs
      defaultActiveKey="1"
      items={new Array(2).fill(null).map((_, i) => {
        const id = String(i);
        return {
          label: `Tab-${id}`,
          key: id,
          disabled: i === 28,
          children: <Content />
        };
      })}
    />
  );
};

export default Tabs;
