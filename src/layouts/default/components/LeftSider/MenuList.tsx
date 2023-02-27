import { Badge, Menu } from 'antd';
import { nanoid } from 'nanoid';
import React from 'react';

import type { MenuProps } from 'antd';
import { isDividerMenu, isGroupMenu, isLeafMenu, isSubMenu } from '@/utils/is';
import { MenuList as RawMenuList } from '@/configs/menu';
import { useNavigate } from 'react-router-dom';
import Iconfont from '@/components/Iconfont';
type AntdMenuItem = Required<MenuProps>['items'][number];

// 自定义菜单组件, 增加菜单 badge/路由支持
const MenuList: React.FC = () => {
  const navigate = useNavigate();

  const handleClick: MenuProps['onClick'] = (info) => {
    if (info.key === location.pathname || !info.key) {
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

  const makeMenuItems = (menuList: Menu.MenuItemType[]): AntdMenuItem[] => {
    const menuItems: AntdMenuItem[] = [];
    menuList.map((rawMenu) => {
      let newMenu: AntdMenuItem | undefined;
      if (isGroupMenu(rawMenu) || isDividerMenu(rawMenu)) {
        newMenu = {
          ...rawMenu,
          key: nanoid()
        };
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
          children: isSubMenu(rawMenu) ? makeMenuItems(rawMenu.children!) : undefined
        };
      }

      if (newMenu !== undefined) {
        menuItems.push(newMenu);
      }
    });

    return menuItems;
  };

  const menuItems = makeMenuItems(RawMenuList);
  return (
    <Menu
      onClick={handleClick}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/user']}
      items={menuItems}
    />
  );
};

export default MenuList;
