import { MenuList } from '@/configs/menu';
import { useFullscreen } from 'ahooks';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ISetFunc<T = boolean> = (value: T) => void;
/**

IGlobalContext 接口定义了全局上下文对象的结构。
@property {boolean} menuCollapsed - 菜单是否收起的状态值。
@property {ISetFunc} setMenuCollapsed - 设置菜单是否收起的函数。
@property {Menu.MenuItemType[]} menuList - 菜单列表数组。
@property {ISetFunc<Menu.MenuItemType[]>} setMenuList - 设置菜单列表的函数。
@property {boolean} isLogin - 是否已登录的状态值。
@property {ISetFunc} setIsLogin - 设置是否已登录的函数。
@property {Api.GetUserInfo['response'] | undefined} userInfo - 用户信息对象或 undefined。
@property {ISetFunc<Api.GetUserInfo['response']>} setUserInfo - 设置用户信息对象的函数。
@property {boolean|undefined} fullScreen - 是否全屏显示的状态值或 undefined。
@property {ISetFunc} setFullScreen - 设置是否全屏显示的函数。
*/
export interface IGlobalContext {
  menuCollapsed: boolean;
  setMenuCollapsed: ISetFunc;
  menuList: Menu.MenuItemType[];
  setMenuList: ISetFunc<Menu.MenuItemType[]>;
  isLogin: boolean;
  setIsLogin: ISetFunc;
  userInfo: Api.GetUserInfo['response'] | null;
  setUserInfo: ISetFunc<Api.GetUserInfo['response'] | null>;
  fullScreen?: boolean;
  setFullScreen: ISetFunc;
}

const setFunc = (value: any) => {};

// 目前暂不知为什么非要传一个初始值, 用的时候也要传一次, 看起来并没有意义
// 原因: 给没有使用 Provider包裹的组件, 如果使用了useContext, 将会得到这个值
// 懒得定义
const initValue: IGlobalContext = undefined as any;

// Context
export const GlobalContext = createContext<IGlobalContext>(initValue);

// Provider
const GlobalProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [menuList, setMenuList] = useState<IGlobalContext['menuList']>(MenuList);
  const [isLogin, setIsLogin] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [fullScreen, { toggleFullscreen: setFullScreen }] = useFullscreen(document.body);
  const [userInfo, setUserInfo] = useState<IGlobalContext['userInfo']>(null);
  const contextValue: IGlobalContext = {
    menuList,
    setMenuList,
    isLogin,
    setIsLogin,
    menuCollapsed,
    setMenuCollapsed,
    userInfo,
    setUserInfo,
    fullScreen,
    setFullScreen
  };
  useEffect(() => {}, [fullScreen]);
  return <GlobalContext.Provider value={contextValue}>{props.children}</GlobalContext.Provider>;
};

export default GlobalProvider;
