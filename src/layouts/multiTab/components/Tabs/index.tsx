import { MultitabContext } from '@/contexts/Multitab';
import useThemeToken from '@/hooks/useThemeToken';
import { FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Tabs as AntdTabs, Tooltip } from 'antd';
import { useContext, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './index.less';

const Tabs = () => {
  const { pathname } = useLocation();
  const { tabs, activeTab, removeTab, tabEvent, addTabWithNavigate } = useContext(MultitabContext);
  const { colorPrimary } = useThemeToken();
  const [fullScreen, setFullScreen] = useState(false);
  const { colorBgLayout } = useThemeToken();

  const handleChangeTab = (tabKey: S) => {
    if (tabKey && tabKey !== pathname) {
      // 内部会判断, 存在就打开
      // 同时内部跳转时会携带url参数, 方便一些
      addTabWithNavigate({ key: tabKey, label: '' });
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

  const handleFullScreen = (value: boolean) => {
    const newFullScreen = value;
    setFullScreen(newFullScreen);
    // tab 事件触发, 全屏Content, 所以在 multitab/components/Content 组件监听 fullScreen 事件
    tabEvent.emit('fullScreen', newFullScreen);
  };

  const TabsAction = () => {
    const renderFullScreenIcon = () => {
      return fullScreen ? (
        <Tooltip title="退出全屏">
          <Button
            onClick={() => handleFullScreen(false)}
            type="link"
            style={{ color: colorPrimary }}
            icon={<FullscreenExitOutlined />}
          />
        </Tooltip>
      ) : (
        <Tooltip title="全屏">
          <Button
            onClick={() => handleFullScreen(true)}
            type="link"
            style={{ color: colorPrimary }}
            icon={<FullscreenOutlined />}
          />
        </Tooltip>
      );
    };
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
        {renderFullScreenIcon()}
      </Space>
    );
  };

  const style: React.CSSProperties = {
    backgroundColor: colorBgLayout,
    // 全屏后标签页应左侧对齐
    left: fullScreen ? 0 : undefined
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
      tabBarExtraContent={<TabsAction />}
      style={style}
    />
  );
};

export default Tabs;
