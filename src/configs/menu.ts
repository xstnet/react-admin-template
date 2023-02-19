import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const MenuList: MenuItem[] = [
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
  }
];

export { MenuList };
