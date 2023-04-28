import ContentBox from '@/components/ContextBox';
import { MultitabContext } from '@/contexts/Multitab';
import { SettingContext } from '@/contexts/Setting';
import { Button, Space, Divider, Alert } from 'antd';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const TabsPage: React.FC<{}> = () => {
  const { removeTab, tabs, setTabs, addTabWithNavigate, addTab } = useContext(MultitabContext);
  const {
    settings: { multitabMode },
    setSetting
  } = useContext(SettingContext);
  const { pathname } = useLocation();
  // 关闭标签页
  const handleCloseTabs = (type: 'left' | 'right' | 'other' | number) => {
    const currentIndex = tabs.findIndex((item) => item.key === pathname);
    if (typeof type === 'number') {
      removeTab(tabs[type]?.key);
      return;
    }
    if (currentIndex === -1) {
      return;
    }
    if (type === 'other') {
      setTabs(tabs.filter((item) => item.key === pathname));
      return;
    }

    if (type === 'left') {
      setTabs(tabs.filter((_, i) => i >= currentIndex));
      return;
    }

    if (type === 'right') {
      setTabs(tabs.filter((_, i) => i <= currentIndex));
      return;
    }
  };
  return (
    <ContentBox>
      {!multitabMode && <Alert type="error" message="请开启多标签模式" />}
      <Divider />

      <Space>
        {!multitabMode && (
          <Button
            type="primary"
            onClick={() => {
              setSetting({ multitabMode: true });
            }}
          >
            打开多标签布局
          </Button>
        )}
        <Button
          disabled={!multitabMode}
          onClick={() => {
            addTabWithNavigate({ label: '控制台', key: '/dashboard' });
          }}
        >
          打开控制台标签页
        </Button>
        <Button
          disabled={!multitabMode}
          onClick={() => {
            addTab({ label: '文章列表', key: '/article/list' }, false);
          }}
        >
          后台打开文章列表
        </Button>
        <Button
          disabled={!multitabMode}
          onClick={() => {
            addTabWithNavigate({ label: '编辑文章ID: 1', key: '/article/update/1' });
          }}
        >
          编辑文章ID: 1
        </Button>
        <Button
          disabled={!multitabMode}
          onClick={() => {
            addTabWithNavigate({ label: '编辑文章ID: 2', key: '/article/update/2' });
          }}
        >
          编辑文章ID: 2
        </Button>
      </Space>
      <Divider />
      <Space>
        <Button disabled={!multitabMode} onClick={handleCloseTabs.bind(this, 1)}>
          关闭第二个标签页
        </Button>
        <Button disabled={!multitabMode} onClick={handleCloseTabs.bind(this, 'left')}>
          关闭左侧标签页
        </Button>
        <Button disabled={!multitabMode} onClick={handleCloseTabs.bind(this, 'right')}>
          关闭右侧标签页
        </Button>
        <Button disabled={!multitabMode} onClick={handleCloseTabs.bind(this, 'other')}>
          关闭其他标签页
        </Button>
      </Space>
    </ContentBox>
  );
};

export default TabsPage;
