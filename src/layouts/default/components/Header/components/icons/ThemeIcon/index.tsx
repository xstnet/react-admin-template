import Iconfont from '@/components/Iconfont';
import { SettingContext } from '@/contexts/Setting';
import { useContext } from 'react';

const ThemeIcon: React.FC<{}> = () => {
  const {
    settings: { theme },
    setSetting
  } = useContext(SettingContext);
  const handleChangeTheme = () => {
    setSetting({ followSystemTheme: false, theme: theme === 'light' ? 'dark' : 'light' });
  };
  return theme === 'dark' ? (
    <Iconfont
      onClick={handleChangeTheme}
      title="主题-深色模式"
      type="icon-theme-dark"
      className="action-icon"
    />
  ) : (
    <Iconfont
      onClick={handleChangeTheme}
      title="主题-明亮模式"
      type="icon-theme-light"
      className="action-icon"
    />
  );
};

export default ThemeIcon;
