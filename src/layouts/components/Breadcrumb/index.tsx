import { MenuContext } from '@/contexts/Menu';
import { createIframeUrl, iframeUrlPrefix } from '@/utils/iframe';
import { isExtendMenu, isGroupMenu, isLeafMenu, isSubMenu } from '@/utils/is';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './index.less';

// breadcrumbNameMap 是一个字符串类型的键值对映射对象，用于保存面包屑导航中每个路径对应的名称。
// '/home': '首页',
// '/userList': '用户列表',
const breadcrumbNameMap = new Map<string, string>();

// makeBreadcrumbNameMap 函数用于生成面包屑导航路径和名称的映射关系，并将其保存在 breadcrumbNameMap 中。
const makeBreadcrumbNameMap = (menuList: Menu.MenuItemType[]) => {
  menuList.map((menu) => {
    if (isExtendMenu(menu)) {
      // 外部链接不参与 面包屑, 防止与内部链接path相同而导致 label 错误
      if (menu?.type === 'url') {
        return;
      }
    }
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
  const { menuList } = useContext(MenuContext);
  // 不能放在 useEffect中, memo执行比effect快, 会导致第一次进页面拿不到数据
  const memoBreadcrumbNameMap = useMemo(() => {
    breadcrumbNameMap.clear();
    makeBreadcrumbNameMap(menuList);
    return breadcrumbNameMap;
  }, [menuList]);

  // antd 提供的绑定 react-route-v6路由
  // https://ant-design.gitee.io/components/breadcrumb-cn#components-breadcrumb-demo-react-router
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const makeIframeBreadcrumb: () => React.ReactNode[] = () => {
    // iframe链接 处理
    if (location.pathname === iframeUrlPrefix) {
      const url = searchParams.get('url');
      if (url && breadcrumbNameMap.has(url)) {
        return [
          <AntdBreadcrumb.Item key={url}>
            <Link style={{ color: 'inherit' }} to={createIframeUrl(url)}>
              {memoBreadcrumbNameMap.get(url)}
            </Link>
          </AntdBreadcrumb.Item>
        ];
      }
    }

    return [];
  };

  // 面包屑导航
  const extraBreadcrumbItems = useMemo(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if (!memoBreadcrumbNameMap.has(url)) {
        return null;
      }

      // 只给最后一级加链接
      return (
        <AntdBreadcrumb.Item key={url}>
          {index === pathSnippets.length - 1 ? (
            <Link style={{ color: 'inherit' }} to={url}>
              {memoBreadcrumbNameMap.get(url)}
            </Link>
          ) : (
            memoBreadcrumbNameMap.get(url)
          )}
        </AntdBreadcrumb.Item>
      );
    });
  }, [location]);

  const breadcrumbItems = [
    <AntdBreadcrumb.Item key="home">
      <HomeOutlined />
    </AntdBreadcrumb.Item>,
    ...extraBreadcrumbItems,
    ...makeIframeBreadcrumb()
  ];

  return <AntdBreadcrumb className="breadcrumb">{breadcrumbItems}</AntdBreadcrumb>;
};

export default React.memo(Breadcrumb);
