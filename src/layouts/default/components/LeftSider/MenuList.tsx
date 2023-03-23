import { Badge, Menu } from 'antd';
import React, { useCallback, useContext, useMemo } from 'react';

import type { MenuProps } from 'antd';
import { isDividerMenu, isExtendMenu, isGroupMenu, isLeafMenu, isSubMenu } from '@/utils/is';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Iconfont from '@/components/Iconfont';
import { createIframeUrl } from '@/utils/iframe';
import Config from '@/configs';
import { MenuContext } from '@/contexts/Menu';
type AntdMenuItem = Required<MenuProps>['items'][number];

// 自定义菜单组件, 增加菜单 badge/路由支持
// 后期可以考虑把 Menu单独提取到一个 Provider中, 减少组件渲染
const MenuList: React.FC = () => {
  const navigate = useNavigate();

  const { menuList: RawMenuList } = useContext(MenuContext);

  let defaultActiveMenu = '/dashboard';
  // 入栈-出栈来匹配
  let defaultOpenKeys: string[] = [];
  // 匹配默认展开菜单是否结束
  let matchOpenKeysEnd = false;
  let incMenuKey = 0;

  const { pathname } = location;
  const [searchParams] = useSearchParams();

  const makeMenuBadge = (menu: Menu.LeafMenuItemType | Menu.SubMenuType) => {
    if (menu.badge) {
      if (menu.badge === 'dot') {
        return (
          <Badge className="menu-item-badge" offset={[6, 0]} dot>
            {menu.label}
          </Badge>
        );
      }
      return (
        <Badge className="menu-item-badge" offset={[15, 0]} count={menu.badge}>
          {menu.label}
        </Badge>
      );
    }
    return menu.label;
  };

  const makeMenuItems = (
    menuList: Menu.MenuItemType[],
    parent?: Menu.ExtendMenuType
  ): AntdMenuItem[] => {
    const menuItems: AntdMenuItem[] = [];
    !matchOpenKeysEnd && parent && defaultOpenKeys.push(parent.key!);
    menuList.map((rawMenu) => {
      if (isExtendMenu(rawMenu)) {
        // 隐藏菜单高亮父级
        // q: 为什么要用 indexOf?
        // a: 因为要兼容 /article/update/10 这种路由
        if (rawMenu.parent && pathname.indexOf(rawMenu.path) === 0) {
          console.log('dddddd', mapPathToMenu, mapPathToMenu.get(rawMenu.parent), rawMenu.parent);

          defaultActiveMenu = mapPathToMenu.get(rawMenu.parent)?.key || '';
          matchOpenKeysEnd = true;
        }

        // 判断当前菜单是否iframe
        if (rawMenu.type === 'iframe') {
          const url = searchParams.get('url') || '';
          if (url === rawMenu.path) {
            matchOpenKeysEnd = true;
            defaultActiveMenu = rawMenu.key!;
          }
        }
        if (rawMenu.hideInMenu) {
          return;
        }
      }

      let newMenu: AntdMenuItem | undefined;
      if (isDividerMenu(rawMenu)) {
        newMenu = { ...rawMenu };
      } else if (isGroupMenu(rawMenu)) {
        // rawMenu是一个联合类型, 赋值时必须明确是联合类型中的哪一个
        newMenu = { ...(rawMenu as Menu.AntdMenuGroupType) };
        if (rawMenu.children && rawMenu.children.length > 0) {
          newMenu.children = makeMenuItems(rawMenu.children);
        }
      } else if (isSubMenu(rawMenu) || isLeafMenu(rawMenu)) {
        let { icon } = rawMenu;
        if (typeof icon === 'string' && icon.includes('icon-')) {
          icon = <Iconfont type={icon} />;
        }
        newMenu = {
          // 从rawMenu继承key
          key: '',
          ...rawMenu,
          icon,
          label: makeMenuBadge(rawMenu),
          // 编译器在这里就会推断 menu 是属于 MenuItemGroupType 或 SubMenuType
          children: isSubMenu(rawMenu) ? makeMenuItems(rawMenu.children!, rawMenu) : undefined
        };

        if (!matchOpenKeysEnd && rawMenu.path === pathname) {
          defaultActiveMenu = rawMenu.key!;
          matchOpenKeysEnd = true;
        }
      }

      if (newMenu) {
        newMenu.key = newMenu.key;
        menuItems.push(newMenu);
      }
    });

    !matchOpenKeysEnd && defaultOpenKeys.pop();
    return menuItems;
  };

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

      const processedMenuList = recursive(RawMenuList);

      return { processedMenuList, mapKeyToMenu, mapPathToMenu };
    };

    return processeMenu();
  }, [RawMenuList]);

  const menuItems = useMemo(() => makeMenuItems(processedMenuList), [processedMenuList]);

  const handleClick: MenuProps['onClick'] = (info) => {
    const menu = mapKeyToMenu.get(info.key);
    console.log('mapKeyToMenu', mapKeyToMenu);

    console.log('clicked menu', info, menu);

    if (!menu) {
      console.warn('未获取到菜单信息');
      return;
    }
    if (menu.path === pathname) {
      return;
    }
    if (menu?.type === 'url') {
      window.open(menu.path, '_blank');
      return;
    }
    document.title = `${Config.pageTitlePrefix} - ${menu.label}`;
    if (menu?.type === 'iframe') {
      console.log('打开iframe页面');

      navigate(createIframeUrl(menu.path));
      return;
    }

    navigate(menu.path);
  };
  console.log('defaultOpenKeys', defaultOpenKeys);
  console.log('defaultActiveMenu', defaultActiveMenu);
  return (
    <Menu
      onClick={handleClick}
      mode="inline"
      defaultSelectedKeys={[String(defaultActiveMenu)]}
      items={menuItems}
      defaultOpenKeys={defaultOpenKeys}
    />
  );
};

export default React.memo(MenuList);
