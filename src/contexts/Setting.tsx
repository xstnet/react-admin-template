import Cache from '@/utils/cache';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import ThemeProvider from './Theme';

export interface IContextValue {
  settings: {
    theme: 'light' | 'dark';
    // 紧凑模式
    compactMode: boolean;
    // 主题跟随系统
    followSystemTheme: boolean;
    // 固定头部
    fixedHeader: boolean;
    // 固定菜单栏
    fixdeMenu: boolean;
    // 主色调
    primaryColor: string;
  };
  setSetting: ISetFunc<Partial<IContextValue['settings']>>;
}

const initValue: IContextValue = undefined as any;

// Context
export const SettingContext = createContext<IContextValue>(initValue);

// Provider
const SettingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initSettings = useMemo(() => {
    const settingsCache = Cache.getObject('settings') || {};
    console.log('settingsCache', settingsCache);

    return {
      theme: 'light',
      compactMode: false,
      followSystemTheme: false,
      fixedHeader: false,
      fixdeMenu: false,
      primaryColor: '#00b96b',
      ...settingsCache
    } as IContextValue['settings'];
  }, []);

  const [settings, setSetting] = useState<IContextValue['settings']>(initSettings);
  // 部分 set
  const setSettingPartial = useCallback<IContextValue['setSetting']>((newSettings) => {
    const writeSettings = { ...settings, ...newSettings };
    setSetting(writeSettings);
    // 存储设置
    Cache.set('settings', writeSettings);
  }, []);

  const contextValue: IContextValue = {
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
