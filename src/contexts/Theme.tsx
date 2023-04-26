import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider, theme as AntdTheme } from 'antd';
import React, { createContext, useContext } from 'react';
import { SettingContext } from './Setting';
import useSystemThemeMode from '@/hooks/useSystemThemeMode';
import 'dayjs/locale/zh-cn';

export interface ThemeContextValue {}

const initValue: ThemeContextValue = undefined as any;

// Context
export const ThemeContext = createContext<ThemeContextValue>(initValue);

// Provider
const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // 继承自 SettingProvider
  const {
    settings: { primaryColor, theme, compactMode, followSystemTheme }
  } = useContext(SettingContext);
  const [systemThemeMode] = useSystemThemeMode();
  const contextValue: ThemeContextValue = {};

  // antd v5主题模式
  const getAlgorithm = () => {
    const algorighm = [];
    // 跟随系统
    if (followSystemTheme) {
      algorighm.push(
        systemThemeMode === 'light' ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm
      );
    } else {
      // 手动切换
      algorighm.push(theme === 'light' ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm);
    }
    compactMode && algorighm.push(AntdTheme.compactAlgorithm);
    return algorighm;
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          // antd v5 预设主题设置方式
          algorithm: getAlgorithm(),

          token: {
            colorPrimary: primaryColor
          },
          components: {
            Button: {
              borderRadius: 4,
              borderRadiusSM: 2
            },
            Modal: {
              borderRadius: 4,
              borderRadiusOuter: 2
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
