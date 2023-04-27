import { useFullscreen } from 'ahooks';
import React, { createContext, useMemo, useState } from 'react';
import MenuProvider from './Menu';
import SettingProvider from './Setting';

/**

GlobalContextValue 接口定义了全局上下文对象的结构。
@property {boolean} isLogin - 是否已登录的状态值。
@property {ISetFunc} setIsLogin - 设置是否已登录的函数。
@property {Api.GetUserInfo['response'] | undefined} userInfo - 用户信息对象或 undefined。
@property {ISetFunc<Api.GetUserInfo['response']>} setUserInfo - 设置用户信息对象的函数。
@property {boolean|undefined} fullScreen - 是否全屏显示的状态值或 undefined。
@property {ISetFunc} setFullScreen - 设置是否全屏显示的函数。
*/
export interface GlobalContextValue {
  isLogin: boolean;
  setIsLogin: ISetFunc;
  userInfo: Api.GetUserInfo['response'] | null;
  setUserInfo: ISetFunc<Api.GetUserInfo['response'] | null>;
  fullScreen?: boolean;
  setFullScreen: ISetFunc;
}

// 目前暂不知为什么非要传一个初始值, 用的时候也要传一次, 看起来并没有意义
// 原因: 给没有使用 Provider包裹的组件, 如果使用了useContext, 将会得到这个值
// 懒得定义
const initValue: GlobalContextValue = undefined as any;

// Context
export const GlobalContext = createContext<GlobalContextValue>(initValue);

// Provider
// todo: 可以考虑拆分 provider, 分为 get 和 set
const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const [fullScreen, { toggleFullscreen: setFullScreen }] = useFullscreen(document.body);
  const [userInfo, setUserInfo] = useState<GlobalContextValue['userInfo']>(null);

  // 参考 https://mp.weixin.qq.com/s/z9GaB_48LHtL-if4mP-nZQ
  const contextValue: GlobalContextValue = useMemo(
    () => ({
      isLogin,
      setIsLogin,
      userInfo,
      setUserInfo,
      fullScreen,
      setFullScreen
    }),
    [isLogin, userInfo, fullScreen]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      <SettingProvider>{children}</SettingProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
