import Cache from '@/utils/cache';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import ThemeProvider from './Theme';

export interface SettingContextValue {
  settings: {
    theme: 'light' | 'dark';
    // 紧凑模式
    compactMode: boolean;
    // 主题跟随系统
    followSystemTheme: boolean;
    // 固定头部
    fixedHeader: boolean;
    // 显示页脚
    showFooter: boolean;
    // 多标签模式
    multitabMode: boolean;
    // 固定菜单栏
    fixedMenu: boolean;
    // 主色调
    primaryColor: string;
  };
  setSetting: ISetFunc<Partial<SettingContextValue['settings']>>;
}

const initValue: SettingContextValue = undefined as any;

// Context
export const SettingContext = createContext<SettingContextValue>(initValue);

// Provider
const SettingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initSettings = useMemo(() => {
    const settingsCache = Cache.getObject('settings') || {};

    return {
      theme: 'light',
      compactMode: false,
      followSystemTheme: true,
      fixedHeader: true,
      fixedMenu: true,
      showFooter: true,
      multitabMode: false,
      primaryColor: '#00b96b',
      ...settingsCache
    } as SettingContextValue['settings'];
  }, []);

  const [settings, setSetting] = useState<SettingContextValue['settings']>(initSettings);
  // 部分 set
  const setSettingPartial = useCallback<SettingContextValue['setSetting']>(
    (newSettings) => {
      const writeSettings = { ...settings, ...newSettings };

      setSetting(writeSettings);
      // 存储设置
      Cache.set('settings', writeSettings);
    },
    [settings]
  );

  const contextValue: SettingContextValue = {
    settings,
    setSetting: setSettingPartial
  };

  return (
    <SettingContext.Provider
      value={contextValue}
      children={<ThemeProvider>{children}</ThemeProvider>}
    />
  );
};

export default SettingProvider;
