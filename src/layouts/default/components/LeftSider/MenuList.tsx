import { Badge, Menu } from 'antd';
import { nanoid } from 'nanoid';
import React from 'react';

import type { MenuProps } from 'antd';
import { isDividerMenu, isGroupMenu, isLeafMenu, isSubMenu } from '@/utils/is';
import { MenuList as RawMenuList } from '@/configs/menu';
import { useNavigate } from 'react-router-dom';
type AntdMenuItem = Required<MenuProps>['items'][number];

// 自定义菜单组件, 增加菜单 badge/路由支持
const MenuList: React.FC = () => {
  const navigate = useNavigate();

  const handleClick: MenuProps['onClick'] = (info) => {
    if (info.key === location.pathname) {
      return;
    }
    console.log('menu', info);

    navigate(info.key);
  };
  const makeMenuBadge = (menu: Menu.LeafMenuItemType | Menu.SubMenuType) => {
    if (menu.badge) {
      if (menu.badge === 'dot') {
        return (
          <Badge className="menu-item-badge" dot>
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
        newMenu = {
          ...rawMenu,
          key: rawMenu.path,
          label: makeMenuBadge(rawMenu),
          // 编译器在这里就会推断 menu 是属于 MenuItemGroupType 或 SubMenuType
          children: isSubMenu(rawMenu) ? makeMenuItems(rawMenu.children!) : undefined
          // onClick: async (menuInfo) => {
          //   // onClick 返回了 false, 阻止页面跳转
          //   if (rawMenu?.onClick) {
          //     const res = rawMenu.onClick(menuInfo);
          //   }
          // }
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
