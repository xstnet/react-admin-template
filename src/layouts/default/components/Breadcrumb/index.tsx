import { GlobalContext } from '@/contexts/Global';
import { isGroupMenu, isLeafMenu, isSubMenu } from '@/utils/is';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.less';

// breadcrumbNameMap 是一个字符串类型的键值对映射对象，用于保存面包屑导航中每个路径对应的名称。
// '/home': '首页',
// '/userList': '用户列表',
const breadcrumbNameMap = new Map<string, string>();

// makeBreadcrumbNameMap 函数用于生成面包屑导航路径和名称的映射关系，并将其保存在 breadcrumbNameMap 中。
const makeBreadcrumbNameMap = (menuList: Menu.MenuItemType[]) => {
  menuList.map((menu) => {
    if (isGroupMenu(menu)) {
      makeBreadcrumbNameMap(menu.children || []);
    }
    if (isSubMenu(menu) || isLeafMenu(menu)) {
      if (menu.path) {
        breadcrumbNameMap.set(menu.path, menu.label);
      }
      // 子路径也要生成
      if (menu.children) {
        makeBreadcrumbNameMap(menu.children || []);
      }
    }
  });
};

const Breadcrumb: React.FC = () => {
  const { menuList } = useContext(GlobalContext);
  useEffect(() => {
    // menuList改变时重置
    breadcrumbNameMap.clear();
    makeBreadcrumbNameMap(menuList);
  }, [menuList]);

  // antd 提供的绑定 react-route-v6路由
  // https://ant-design.gitee.io/components/breadcrumb-cn#components-breadcrumb-demo-react-router
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    if (!breadcrumbNameMap.has(url)) {
      return null;
    }
    return (
      <AntdBreadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap.get(url)}</Link>
      </AntdBreadcrumb.Item>
    );
  });

  extraBreadcrumbItems.unshift(
    <AntdBreadcrumb.Item key="home">
      <HomeOutlined />
    </AntdBreadcrumb.Item>
  );

  return <AntdBreadcrumb className="breadcrumb">{extraBreadcrumbItems}</AntdBreadcrumb>;
};

export default Breadcrumb;
