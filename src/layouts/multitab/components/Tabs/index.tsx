import { MultitabContext } from '@/contexts/Multitab';
import useThemeToken from '@/hooks/useThemeToken';
import { FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Tabs as AntdTabs, Tooltip } from 'antd';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';

const Tabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tabs, activeTab, removeTab, tabEvent } = useContext(MultitabContext);
  const { colorPrimary } = useThemeToken();

  const handleChangeTab = (tabKey: S) => {
    if (tabKey && tabKey !== pathname) {
      navigate(tabKey);
    }
  };

  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      removeTab(targetKey as string);
    }
  };

  const handleReload = () => {
    tabEvent.emit('reload', pathname);
  };
  const TabsOperate = () => {
    return (
      <Space size={0}>
        <Tooltip title="刷新当前页面">
          <Button
            onClick={handleReload}
            type="link"
            style={{ color: colorPrimary }}
            icon={<ReloadOutlined />}
          />
        </Tooltip>
        <Tooltip title="全屏">
          <Button
            onClick={handleReload}
            type="link"
            style={{ color: colorPrimary }}
            icon={<FullscreenOutlined />}
          />
        </Tooltip>
      </Space>
    );
  };
  return (
    <AntdTabs
      className="tabs-wrapper"
      type="editable-card"
      hideAdd
      activeKey={activeTab}
      items={[...tabs]}
      onChange={handleChangeTab}
      onEdit={onEdit}
      tabBarExtraContent={<TabsOperate />}
    />
  );
};

export default Tabs;
