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
  const { tabs, activeTab, openTab, removeTab } = useContext(MultitabContext);

  const handleChangeTab = (tabKey: S) => {
    console.log('tabclick, tabKey', tabKey, typeof tabKey);
    const { path } = (mapKeyToMenu.has(tabKey) && mapKeyToMenu.get(tabKey)) || { path: undefined };
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };

  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      return;
    } else {
      removeTab(targetKey as string);
    }
  };
  return (
    <AntdTabs
      className="tabs-wrapper"
      type="editable-card"
      hideAdd
      activeKey={activeTab}
      items={tabs}
      onChange={handleChangeTab}
      onEdit={onEdit}
    />
  );
};

export default Tabs;
