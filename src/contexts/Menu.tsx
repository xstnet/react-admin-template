import { MenuList } from '@/configs/menu';
import { isSubMenu, isGroupMenu, isExtendMenu } from '@/utils/is';
import React, { createContext, useMemo, useState } from 'react';

export interface IContextValue {
  menuCollapsed: boolean;
  setMenuCollapsed: ISetFunc;
  menuList: Menu.MenuItemType[];
  setMenuList: ISetFunc<Menu.MenuItemType[]>;
  mapPathToMenu: Map<string, Menu.ExtendMenuType>;
  mapKeyToMenu: Map<React.Key, Menu.ExtendMenuType>;
}

const initValue: IContextValue = undefined as any;

// Context
export const MenuContext = createContext<IContextValue>(initValue);

// Provider
const MenuProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  let incMenuKey = 0;
  const initMenuList = useMemo(() => MenuList, [MenuList]);

  const [rawMenuList, setMenuList] = useState<IContextValue['menuList']>(initMenuList);
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { mapPathToMenu, mapKeyToMenu, processedMenuList } = useMemo(() => {
    // 菜单数据处理
    // 1. key 绑定
    // 2. 创建 map key--->menuItem
    // 2. 创建 map path-->menuItem
    const processeMenu = () => {
      const mapKeyToMenu = new Map<React.Key, Menu.ExtendMenuType>();
      const mapPathToMenu = new Map<string, Menu.ExtendMenuType>();

      const addKey = (item: Menu.MenuItemType): Menu.MenuItemType => {
        if (!item.key) {
          item.key = String(++incMenuKey);
        }
        return { ...item };
      };
      const recursive = (list: Menu.MenuItemType[]): Menu.MenuItemType[] => {
        return list.map((item: any) => {
          const newItem = addKey(item);
          if (isSubMenu(newItem) || isGroupMenu(newItem)) {
            newItem.children = recursive(newItem.children || []);
          }

          isExtendMenu(newItem) && mapPathToMenu.set(newItem.path, newItem);
          newItem?.key && mapKeyToMenu.set(newItem.key, newItem as Menu.ExtendMenuType);

          return newItem;
        });
      };

      const processedMenuList = recursive(rawMenuList);

      return { processedMenuList, mapKeyToMenu, mapPathToMenu };
    };

    return processeMenu();
  }, [rawMenuList]);

  const contextValue: IContextValue = useMemo(
    () => ({
      menuList: processedMenuList,
      setMenuList,
      menuCollapsed,
      setMenuCollapsed,
      mapPathToMenu,
      mapKeyToMenu
    }),
    [rawMenuList, menuCollapsed]
  );

  return <MenuContext.Provider value={contextValue} children={children} />;
};

export default MenuProvider;
