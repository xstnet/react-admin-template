import Iconfont from '@/components/Iconfont';

const MenuList: Menu.MenuItemType[] = [
  {
    label: '控制台',
    icon: 'icon-dashboard',
    path: '/dashboard'
  },
  {
    label: '用户列表',
    icon: 'icon-article',
    path: '/user',
    badge: 99
  },

  {
    label: '示例页面',
    type: 'group',
    children: [
      {
        label: '示例页面',
        icon: 'icon-example',
        path: '/example',
        badge: 'dot'
      },
      {
        label: '列表页',
        icon: 'icon-list',
        path: '/example/userList'
      }
    ]
  },
  { type: 'divider' },

  {
    path: '/article',
    label: '文章管理',
    icon: 'icon-article',
    children: [
      {
        path: '/article/list',
        label: '文章列表',
        icon: 'icon-article'
      },
      {
        path: '/article/category',
        label: '分类列表',
        icon: 'icon-list'
      }
    ]
  },
  {
    path: '/permission',
    label: '权限管理',
    icon: 'icon-permissions',
    children: [
      {
        path: '/permission/role',
        label: '角色列表',
        icon: 'icon-list'
      },
      {
        path: '/permission/node',
        label: '权限列表',
        icon: 'icon-permissions'
      },
      {
        path: '/permission/user',
        label: '用户列表',
        icon: 'icon-user-permissions'
      }
    ]
  },
  {
    path: '/iframe',
    label: '外部页面',
    icon: 'icon-href',
    children: [
      {
        path: 'https://ant.design/components/overview-cn',
        label: 'antd文档(外链)',
        icon: 'icon-document'
      },
      {
        path: '/iframe/https://ant.design/components/overview-cn',
        label: 'antd文档(内嵌)',
        icon: 'icon-document'
      }
    ]
  },
  {
    path: '/document',
    label: '文档',
    icon: 'icon-document',
    children: [
      {
        path: '/document/start',
        label: '开始使用',
        icon: 'icon-document'
      },
      {
        path: '/document/package.json',
        label: 'Package文件说明',
        icon: 'icon-document'
      }
    ]
  }
];
export { MenuList };
