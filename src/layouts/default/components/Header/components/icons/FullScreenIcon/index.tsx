import { message } from 'antd';
import { GlobalContext } from '@/contexts/Global';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useContext } from 'react';

const FullScreenIcon: React.FC<{}> = () => {
  const { fullScreen, setFullScreen } = useContext(GlobalContext);

  const handleFullScreen = () => {
    message.success(!fullScreen ? '进入全屏模式' : '已退出全屏模式');
    setFullScreen(!fullScreen);
  };

  return fullScreen ? (
    <FullscreenExitOutlined
      title="退出全屏模式"
      className="action-icon"
      onClick={handleFullScreen}
    />
  ) : (
    <FullscreenOutlined title="进入全屏模式" className="action-icon" onClick={handleFullScreen} />
  );
};

export default FullScreenIcon;
