import React, { createContext, useContext, useState } from 'react';

type ISetFunc<T = boolean> = (value: T) => void;
export interface IGlobalContext {
  menuCollapsed: boolean;
  setMenuCollapsed: ISetFunc;
  isLogin: boolean;
  setIsLogin: ISetFunc;
  userInfo?: {};
  setUserInfo?: ISetFunc<any>;
}

const setFunc = (value: any) => {};

// 目前暂不知为什么非要传一个初始值, 用的时候也要传一次, 看起来并没有意义
// 原因: 给没有使用 Provider包裹的组件, 如果使用了useContext, 将会得到这个值
const initValue: IGlobalContext = {
  isLogin: false,
  menuCollapsed: false,
  setIsLogin: setFunc,
  setMenuCollapsed: setFunc
};

// Context
export const GlobalContext = createContext<IGlobalContext>(initValue);

// Provider
const GlobalProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState<{}>({});
  const contextValue: IGlobalContext = {
    isLogin,
    setIsLogin,
    menuCollapsed,
    setMenuCollapsed,
    userInfo,
    setUserInfo
  };
  return <GlobalContext.Provider value={contextValue}>{props.children}</GlobalContext.Provider>;
};

export default GlobalProvider;
