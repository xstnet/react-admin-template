// 菜单类型定义
declare namespace Menu {
  // 额外扩展的字段
  type ExtendMenuType = {
    // 默认作为key, path相同时可以手动指定key
    path: string;
    label: string;

    // 父菜单下的默认子页面
    // 未实现
    // index?: boolean;

    // 子路由信息, 用来判断直接从url访问时, 应该高亮哪个菜单
    // 适用于未在菜单上出现的路由,如添加页面/编辑页面等
    // 未实现
    // subRouters?: string[];

    // 父级菜单 path
    parent?: string;
    badge?: 'dot' | number;
    children?: MenuItemType[];
    // path 相同时可定义key
    key?: string;
    hideInMenu?: boolean;
    type?: 'iframe' | 'url';
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
