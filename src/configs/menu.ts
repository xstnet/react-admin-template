import type { MenuProps } from 'antd';

export type MenuItemType = Partial<Required<MenuProps>['items'][number]>;

export type ExtendMenuItemType = {
  path: string;
  label: string;
  components?: string;
  badge?: 'dot' | number;
  children?: ExtendMenuItemType[];
} & MenuItemType;

const MenuList: ExtendMenuItemType[] = [
  {
    label: '控制台',
    icon: null,
    path: '/dashboard',
    components: '@page/Dashboard',
    badge: 'dot',
    onClick: (info) => {
      console.log(444, info);
    }
  },
  {
    label: '用户列表',
    icon: null,
    path: '/user',
    components: '@page/Login',
    badge: 99
  },
  {
    label: '用户列表2',
    icon: null,
    path: '/user2',
    components: '@page/Login',
    badge: undefined
  }
  // {
  //   key: 'article',
  //   label: '文章管理',
  //   icon: null,
  //   children: [
  //     {
  //       key: 'article/list',
  //       label: '文章列表',
  //       icon: null,
  //     },
  //     {
  //       key: 'article/category',
  //       label: '分类列表',
  //       icon: null
  //     }
  //   ]
  // },
  // {
  //   key: 'permission',
  //   label: '权限管理',
  //   icon: null,
  //   children: [
  //     {
  //       key: 'permission/role',
  //       label: '角色列表',
  //       icon: null
  //     },
  //     {
  //       key: 'permission/node',
  //       label: '权限列表',
  //       icon: null
  //     },
  //     {
  //       key: 'permission/user',
  //       label: '用户列表',
  //       icon: null
  //     }
  //   ]
  // }
];

export { MenuList };
