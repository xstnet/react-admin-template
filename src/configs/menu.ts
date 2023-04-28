import Iconfont from '@/components/Iconfont';

const MenuList: Menu.MenuItemType[] = [
  {
    label: '控制台',
    icon: 'icon-dashboard',
    path: '/dashboard',
    permission: 'admin'
  },
  {
    label: '示例页面',
    path: '/example',
    icon: 'icon-example',
    children: [
      {
        label: '列表页',
        icon: 'icon-list',
        path: '/example/userList',
        permission: ['admin', 'guest']
      },
      {
        label: '权限测试页',
        icon: 'icon-list',
        path: '/example/permission',
        children: [
          {
            label: '菜单权限',
            icon: 'icon-list',
            path: '/example/permission/menu'
          },
          {
            label: '按钮权限',
            icon: 'icon-list',
            path: '/example/permission/button'
          }
        ]
      },
      {
        label: '多级菜单',
        icon: 'icon-list',
        path: '/multilevel/menu',
        children: [
          {
            label: '二级菜单',
            icon: 'icon-list',
            path: '/multilevel/menu/2',
            children: [
              {
                label: '三级菜单',
                icon: 'icon-list',
                path: '/multilevel/menu/2/3'
              }
            ]
          }
        ]
      },
      {
        label: 'Tabs标签页',
        icon: 'icon-list',
        path: '/example/tabs',
        children: [
          {
            label: '标签管理',
            icon: 'icon-list',
            path: '/example/tabs/manage'
          }
        ]
      },
      {
        label: '空白页',
        icon: 'icon-example',
        path: '/blank'
      },
      {
        label: '404',
        icon: 'icon-example',
        path: '/404'
      }
    ]
  },
  {
    label: '徽标示例',
    path: '/badge',
    icon: 'icon-example',
    children: [
      {
        label: '红点徽标',
        icon: 'icon-list',
        badge: 'dot',
        path: '/badge/dot'
      },
      {
        label: '数字徽标',
        icon: 'icon-example',
        badge: 98,
        path: '/badge/count'
      }
    ]
  },
  // { type: 'divider' },

  {
    path: '/article',
    label: '文章管理',
    icon: 'icon-article',
    permission: 'admin',
    children: [
      {
        path: '/article/list',
        label: '文章列表',
        icon: 'icon-article'
      },
      {
        // 演示子页面不和父页面路径前缀一致时, 怎么去自动高亮菜单显示
        path: '/article/create',
        label: '发布文章',
        hideInMenu: true,
        parent: '/article/list'
      },
      {
        path: '/article/update',
        label: '更新文章',
        hideInMenu: true,
        parent: '/article/list'
      },
      {
        path: '/article/category',
        label: '分类管理',
        icon: 'icon-list'
      }
    ]
  },
  // {
  //   path: '/permission',
  //   label: '权限管理',
  //   icon: 'icon-permissions',
  //   children: [
  //     {
  //       path: '/permission/role',
  //       label: '角色列表',
  //       icon: 'icon-list'
  //     },
  //     {
  //       path: '/permission/node',
  //       label: '权限列表',
  //       icon: 'icon-permissions'
  //     },
  //     {
  //       path: '/permission/user',
  //       label: '用户列表',
  //       icon: 'icon-user-permissions'
  //     }
  //   ]
  // },
  {
    path: '/iframe',
    label: '外部页面',
    icon: 'icon-href',
    permission: 'admin',
    children: [
      {
        path: 'https://ant-design.antgroup.com/components/overview-cn',
        label: 'antd文档(外链)',
        icon: 'icon-document',
        type: 'url'
      },
      {
        path: 'https://ant-design.antgroup.com/components/overview-cn/',
        label: 'antd文档(内嵌)',
        icon: 'icon-document',
        type: 'iframe'
      },
      {
        path: 'https://www.xstnet.com',
        label: '博客主页(内嵌)',
        icon: 'icon-document',
        type: 'iframe'
      },
      {
        path: 'https://baidu.com',
        label: '百度',
        icon: 'icon-document',
        type: 'iframe'
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
  },
  // { type: 'divider' },
  {
    path: '/user/center',
    label: '个人中心',
    icon: 'icon-user-permissions',
    permission: (userInfo) => userInfo.roles.includes('admin'),
    children: [
      {
        path: '/user/center/index',
        label: '个人中心',
        icon: 'icon-example'
      },
      {
        path: '/user/center/update',
        label: '修改信息',
        icon: 'icon-document'
      }
    ]
  }
];

// 调用这个方法获取菜单, 具体怎么获取全看怎么写
const generateMenuList = async (
  userInfo: Api.GetUserInfo['response']
): Promise<Menu.MenuItemType[]> => {
  return MenuList;
};
export { generateMenuList };
