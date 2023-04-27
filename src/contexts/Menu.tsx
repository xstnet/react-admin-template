import { generateMenuList } from '@/configs/menu';
import { isSubMenu, isGroupMenu, isExtendMenu } from '@/utils/is';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from './Global';
import PageLoading from '@/components/Loading/PageLoading';
import { hasPermission } from '@/utils/util';

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
  const { userInfo } = useContext(GlobalContext);

  const [rawMenuList, setMenuList] = useState<MenuContextValue['menuList']>([]);
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  useEffect(() => {
    async function getMenuList() {
      try {
        const menuList = await generateMenuList(userInfo!);
        setMenuList([...menuList]);
      } catch (e) {
        console.warn('获取菜单数据失败', e);
      }
    }

    getMenuList();
  }, [userInfo]);

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
        // 去除 permission 属性, 否则放到dom上会报错
        const { permission, ...rest } = item as any;
        return rest;
      };
      const recursive = (list: Menu.MenuItemType[]): Menu.MenuItemType[] => {
        const menuItems = list.map((item: any) => {
          const { permission = undefined } = item;
          if (!hasPermission(permission, userInfo!)) {
            return null;
          }

          const newItem = addKey(item);

          // 含有子级菜单, 或者是一个Group, 递归
          if (isSubMenu(newItem) || isGroupMenu(newItem)) {
            newItem.children = recursive(newItem.children || []);
            // 如果子菜单都没有权限, 父菜单也没必要显示了
            if (!newItem.children || !newItem.children?.length) {
              return null;
            }
          }

          isExtendMenu(newItem) && mapPathToMenu.set(newItem.path, newItem);
          return newItem;
        });

        return menuItems.filter((item) => item) as Menu.MenuItemType[];
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

  // 菜单未获取到时, 避免无用的渲染
  if (rawMenuList.length === 0) {
    return (
      <MenuContext.Provider value={contextValue}>
        <PageLoading />
      </MenuContext.Provider>
    );
  }
  return <MenuContext.Provider value={contextValue} children={children} />;
};

export default MenuProvider;
