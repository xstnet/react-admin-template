import { Badge, Menu, MenuProps } from 'antd';
import React from 'react';

import { MenuList as RawMenuList, ExtendMenuItemType } from '@/configs/menu';
type MenuItemType = Required<MenuProps>['items'][number];

const MenuList: React.FC = () => {
  const makeMenuItems = (menuList: ExtendMenuItemType[]): MenuItemType[] => {
    const menuItems: MenuItemType[] = [];
    menuList.map((item) => {
      const tmpItem: MenuItemType = {
        ...item,
        key: item.path,
        onClick: (info) => {
          console.log('3');
          // @ts-ignore
          item?.onClick && item?.onClick(info);
        }
      };
      if (item.children) {
        // @ts-ignore
        tmpItem.children = makeMenuItems(item.children);
      }

      if (item.badge) {
        if (item.badge === 'dot') {
          tmpItem.label = <Badge dot>{item.label}</Badge>;
        } else {
          tmpItem.label = (
            <Badge offset={[10, 0]} count={item.badge}>
              {item.label}
            </Badge>
          );
        }
      }
      menuItems.push(tmpItem);
    });

    return menuItems;
  };

  const menuItems = makeMenuItems(RawMenuList);

  return <Menu theme="dark" mode="inline" defaultSelectedKeys={['/dashboard']} items={menuItems} />;
};

export default MenuList;
