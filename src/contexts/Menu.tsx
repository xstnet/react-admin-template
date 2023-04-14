import { MenuList } from '@/configs/menu';
import { isSubMenu, isGroupMenu, isExtendMenu } from '@/utils/is';
import React, { createContext, useMemo, useState } from 'react';

export interface MenuContextValue {
  menuCollapsed: boolean;
  setMenuCollapsed: ISetFunc;
  menuList: Menu.MenuItemType[];
  setMenuList: ISetFunc<Menu.MenuItemType[]>;
  mapPathToMenu: Map<string, Menu.ExtendMenuType>;
}

const initValue: MenuContextValue = undefined as any;

// Context
export const MenuContext = createContext<MenuContextValue>(initValue);

// Provider
const MenuProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  let incMenuKey = 0;
  const initMenuList = useMemo(() => MenuList, [MenuList]);

  const [rawMenuList, setMenuList] = useState<MenuContextValue['menuList']>(initMenuList);
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { mapPathToMenu, processedMenuList } = useMemo(() => {
    // 菜单数据处理
    // 1. key 绑定
    // 2. 创建 map key--->menuItem
    // 2. 创建 map path-->menuItem
    const processeMenu = () => {
      const mapPathToMenu = new Map<string, Menu.ExtendMenuType>();

      const addKey = (item: Menu.MenuItemType): Menu.MenuItemType => {
        if (isExtendMenu(item)) {
          item.key = item?.key || item.path;
        }
        return { ...item };
      };
      const recursive = (list: Menu.MenuItemType[]): Menu.MenuItemType[] => {
        return list.map((item: any) => {
          const newItem = addKey(item);
          // 含有子级菜单, 或者是一个Group, 递归
          if (isSubMenu(newItem) || isGroupMenu(newItem)) {
            newItem.children = recursive(newItem.children || []);
          }

          isExtendMenu(newItem) && mapPathToMenu.set(newItem.path, newItem);

          return newItem;
        });
      };

      const processedMenuList = recursive(rawMenuList);

      return { processedMenuList, mapPathToMenu };
    };

    return processeMenu();
  }, [rawMenuList]);

  const contextValue: MenuContextValue = useMemo(
    () => ({
      menuList: processedMenuList,
      setMenuList,
      menuCollapsed,
      setMenuCollapsed,
      mapPathToMenu
    }),
    [rawMenuList, menuCollapsed]
  );

  return <MenuContext.Provider value={contextValue} children={children} />;
};

export default MenuProvider;
