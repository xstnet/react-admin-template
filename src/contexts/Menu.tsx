import { MenuList } from '@/configs/menu';
import React, { createContext, useMemo, useState } from 'react';

export interface IContextValue {
  menuCollapsed: boolean;
  setMenuCollapsed: ISetFunc;
  menuList: Menu.MenuItemType[];
  setMenuList: ISetFunc<Menu.MenuItemType[]>;
}

const initValue: IContextValue = undefined as any;

// Context
export const MenuContext = createContext<IContextValue>(initValue);

// Provider
const MenuProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initMenuList = useMemo(() => MenuList, [MenuList]);

  const [menuList, setMenuList] = useState<IContextValue['menuList']>(initMenuList);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const contextValue: IContextValue = useMemo(
    () => ({
      menuList,
      setMenuList,
      menuCollapsed,
      setMenuCollapsed
    }),
    [menuList, menuCollapsed]
  );

  return <MenuContext.Provider value={contextValue} children={children} />;
};

export default MenuProvider;
