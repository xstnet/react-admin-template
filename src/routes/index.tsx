import { lazy } from 'react';

import DashboardPage from '@/pages/Dashboard';
import { UserCenterPage, UserCenterUpdatePage } from '@/pages/UserCenter';
import { ExampleUserListPage } from '@/pages/Example';
import { ArticleIndexPage } from '@/pages/Article';
import { ArticleCreatePage, ArticleUpdatePage } from '@/pages/Article';
import { useRoutes } from 'react-router-dom';

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
      path: '*',
      element: <span>页面不存在~</span>
    }
  ]);
  return routes;
}
