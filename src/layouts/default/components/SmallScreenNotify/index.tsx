import { SettingContext } from '@/contexts/Setting';
import { notification, Button, Space } from 'antd';
import { useContext, useEffect } from 'react';

const SmallScreenNotify = () => {
  const [api, contextHolder] = notification.useNotification();
  const {
    setSetting,
    settings: { compactMode }
  } = useContext(SettingContext);
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          关闭提示
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setSetting({ compactMode: true });
            api.destroy(key);
          }}
        >
          开启
        </Button>
      </Space>
    );
    api['info']({
      message: '开启紧凑布局模式',
      description: '检测到您的屏幕尺寸过小, 是否开启紧凑布局模式? 或者您也可以选择在设置中手动开启',
      btn,
      key
      //   onClose: close
    });
  };

  // 小屏紧凑模式提示
  useEffect(() => {
    if (!compactMode && window.innerWidth <= 1440) {
      openNotification();
    }
  }, []);

  return contextHolder;
};

export default SmallScreenNotify;
