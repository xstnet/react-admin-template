import { Badge, Menu } from 'antd';
import { nanoid } from 'nanoid';
import React, { useContext, useMemo } from 'react';

import type { MenuProps } from 'antd';
import { isDividerMenu, isExtendMenu, isGroupMenu, isLeafMenu, isSubMenu } from '@/utils/is';
import { useNavigate } from 'react-router-dom';
import Iconfont from '@/components/Iconfont';
import { GlobalContext } from '@/contexts/Global';
type AntdMenuItem = Required<MenuProps>['items'][number];

// 自定义菜单组件, 增加菜单 badge/路由支持
// 后期可以考虑把 Menu单独提取到一个 Provider中, 减少组件渲染
const MenuList: React.FC = () => {
  const navigate = useNavigate();

  const { menuList: RawMenuList } = useContext(GlobalContext);

  let defaultActiveMenu = '/dashboard';
  // 入栈-出栈来匹配
  let defaultOpenKeys: string[] = [];
  // 匹配默认打开菜单是否结束
  let matchedOpenKeysEnd = false;

  const { pathname } = location;

  const handleClick: MenuProps['onClick'] = (info) => {
    if (info.key === pathname || !info.key) {
      return;
    }
    console.log('clicked menu', info);

    navigate(info.key);
  };
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
    !matchedOpenKeysEnd && parent && defaultOpenKeys.push(parent.path);
    menuList.map((rawMenu) => {
      if (isExtendMenu(rawMenu)) {
        // 隐藏菜单高亮父级
        // q: 为什么要用 indexOf?
        // a: 因为要兼容 /article/update/10 这种路由
        if (rawMenu.parent && pathname.indexOf(rawMenu.path) === 0) {
          defaultActiveMenu = rawMenu.parent;
          matchedOpenKeysEnd = true;

          // todo: 默认展开菜单
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
          ...rawMenu,
          icon,
          key: rawMenu.path,
          label: makeMenuBadge(rawMenu),
          // 编译器在这里就会推断 menu 是属于 MenuItemGroupType 或 SubMenuType
          children: isSubMenu(rawMenu) ? makeMenuItems(rawMenu.children!, rawMenu) : undefined
        };

        if (rawMenu.path === pathname) {
          defaultActiveMenu = rawMenu.path;
          matchedOpenKeysEnd = true;
        }
      }

      if (newMenu) {
        newMenu.key = newMenu.key || nanoid();
        menuItems.push(newMenu);
      }
    });

    !matchedOpenKeysEnd && defaultOpenKeys.pop();
    return menuItems;
  };

  const menuItems = useMemo(() => makeMenuItems(RawMenuList), [RawMenuList]);

  return (
    <Menu
      onClick={handleClick}
      mode="inline"
      defaultSelectedKeys={[defaultActiveMenu]}
      items={menuItems}
      defaultOpenKeys={defaultOpenKeys}
    />
  );
};

export default React.memo(MenuList);
