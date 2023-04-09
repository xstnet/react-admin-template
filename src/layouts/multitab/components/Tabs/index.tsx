import { MenuContext } from '@/contexts/Menu';
import { MultitabContext } from '@/contexts/Multitab';
import { Tabs as AntdTabs } from 'antd';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';

const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mapKeyToMenu } = useContext(MenuContext);
  const { tabs, activeTab, openTab } = useContext(MultitabContext);

  const handleChangeTab = (tabKey: S) => {
    console.log('tabclick, tabKey', tabKey, typeof tabKey);
    const { path } = (mapKeyToMenu.has(tabKey) && mapKeyToMenu.get(tabKey)) || { path: undefined };
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };
  return <AntdTabs activeKey={activeTab} items={tabs} onChange={handleChangeTab} />;
};

export default Tabs;
