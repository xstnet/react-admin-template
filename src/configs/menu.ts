import Iconfont from '@/components/Iconfont';

const MenuList: Menu.MenuItemType[] = [
  {
    label: '控制台',
    icon: 'icon-dashboard',
    path: '/dashboard',

    children: [
      {
        label: '控制台2',
        icon: 'icon-dashboard',
        path: '/dashboard3',
        badge: 'dot'
      },
      {
        label: '控制台4',
        icon: 'icon-dashboard',
        path: '/dashboard4'
      }
    ]
  },

  {
    label: '用户列表',
    icon: 'icon-article',
    path: '/user',
    badge: 99
  },
  {
    label: '示例页面',
    icon: 'icon-example',
    path: '/example',
    badge: 'dot'
  },
  {
    label: '退出',
    icon: 'icon-logout',
    path: '/logout'
  }
  // {
  //   label: '用户列表2',
  //   icon: null,
  //   path: '/user2',
  //   badge: undefined
  // }
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
