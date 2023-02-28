// 菜单类型定义
declare namespace Menu {
  // 额外扩展的字段
  type ExtendMenuType = {
    path: string;
    label: string;
    badge?: 'dot' | number;
    children?: MenuItemType[];
    key?: string;
  };

  // 菜单类型, 不含子菜单
  type LeafMenuItemType = Omit<
    import('antd/es/menu/hooks/useItems').MenuItemType,
    'key' | 'children'
  > &
    ExtendMenuType;
  // 子菜单类型
  type SubMenuType = Omit<import('antd/es/menu/hooks/useItems').SubMenuType, 'key' | 'children'> &
    ExtendMenuType;
  // 分组菜单
  type AntdMenuGroupType = import('antd/es/menu/hooks/useItems').MenuItemGroupType;
  type MenuItemGroupType = Omit<AntdMenuGroupType, 'children'> & {
    children?: ExtendMenuType['children'];
  };
  // 分割线
  type MenuDividerType = import('antd/es/menu/hooks/useItems').MenuDividerType;

  // 菜单类型
  type MenuItemType = LeafMenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType;
}
