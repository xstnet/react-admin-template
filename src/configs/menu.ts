import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const MenuList: MenuItem[] = [
  {
    key: 'dashboard',
    label: '控制台',
    icon: null,
    children: undefined
  },
  {
    key: 'user',
    label: '用户列表',
    icon: null,
    children: undefined
  },
  {
    key: 'article',
    label: '文章管理',
    icon: null,
    children: [
      {
        key: 'article/list',
        label: '文章列表',
        icon: null
      },
      {
        key: 'article/category',
        label: '分类列表',
        icon: null
      }
    ]
  },
  {
    key: 'permission',
    label: '权限管理',
    icon: null,
    children: [
      {
        key: 'permission/role',
        label: '角色列表',
        icon: null
      },
      {
        key: 'permission/node',
        label: '权限列表',
        icon: null
      },
      {
        key: 'permission/user',
        label: '用户列表',
        icon: null
      }
    ]
  }
];

export { MenuList };
