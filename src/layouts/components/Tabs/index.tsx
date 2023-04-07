import { MultitabContext } from '@/contexts/Multitab';
import { SettingContext } from '@/contexts/Setting';
import { Tabs as AntdTabs } from 'antd';
import { useContext } from 'react';
import './index.less';

const Tabs = () => {
  const { tabs, activeTab, open } = useContext(MultitabContext);
  return (
    <AntdTabs
      activeKey={activeTab}
      items={tabs}
      onChange={(e) => {
        open(e);
      }}
    />
  );
};

export default Tabs;
