import { lazy } from 'react';

import DashboardPage from '@/pages/Dashboard';
import { UserCenterPage, UserCenterUpdatePage } from '@/pages/UserCenter';
import { BlankPage, ExampleUserListPage } from '@/pages/Example';
import { ArticleIndexPage } from '@/pages/Article';
import { NotFoundPage } from '@/pages/Error';
import { ArticleCreatePage, ArticleUpdatePage } from '@/pages/Article';
import { useRoutes } from 'react-router-dom';
import IframePage from '@/pages/Iframe';
import { iframeUrlPrefix } from '@/utils/iframe';

// todo: Suspense
// const DashboardPage = lazy(() => import('@page/Dashboard'));
// const UserPage = lazy(() => import('@page/User'));

export default function DefaultRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardPage />
    },
    {
      path: '/dashboard',
      element: <DashboardPage />
    },
    {
      path: '/user',
      children: [
        {
          index: true,
          element: <UserCenterPage />
        },
        {
          path: '/user/center/index',
          element: <UserCenterPage />
        },
        {
          path: '/user/center/update',
          element: <UserCenterUpdatePage />
        }
      ]
    },
    {
      path: '/example/userList',
      element: <ExampleUserListPage />
    },
    {
      path: '/article',
      // element: <ArticleIndexPage />,
      children: [
        {
          index: true,
          element: <ArticleIndexPage />
        },
        {
          path: '/article/list',
          element: <ArticleIndexPage />
        },
        {
          path: '/article/create',
          element: <ArticleCreatePage />
        },
        {
          path: '/article/update/:id',
          element: <ArticleUpdatePage />
        }
      ]
    },
    {
      path: '/blank',
      element: <BlankPage />
    },
    {
      path: iframeUrlPrefix,
      element: <IframePage />
    },
    {
      path: '/multilevel/menu/2/3',
      element: <BlankPage title="三级菜单" />
    },

    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);
  return routes;
}
