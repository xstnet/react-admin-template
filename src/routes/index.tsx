import React, { lazy } from 'react';

import { RouteObject } from 'react-router-dom';
import GlobalLayout from '@/layouts/global';
import PageLoading from '@/components/Loading/PageLoading';

import { UserCenterPage, UserCenterUpdatePage } from '@/pages/UserCenter';
import { BlankPage, ExampleUserListPage } from '@/pages/Example';
import { NotFoundPage } from '@/pages/Error';
import { ArticleCreatePage, ArticleUpdatePage } from '@/pages/Article';

import { iframeUrlPrefix } from '@/utils/iframe';

const TabsPage = lazy(() => import('@/pages/Example/tabs'));
const ArticleIndexPage = lazy(() => import('@/pages/Article/Index'));
const LoginPage = lazy(() => import('@/pages/Login'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const IframePage = lazy(() => import('@/pages/Iframe'));

const Suspense: React.FC<React.PropsWithChildren> = ({ children }) => (
  <React.Suspense fallback={<PageLoading />}>{children}</React.Suspense>
);

export default function DefaultRoutes() {
  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Suspense children={<LoginPage />} />
    },
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        {
          path: '/',
          element: <Suspense children={<DashboardPage />} />
        },
        {
          path: '/dashboard',
          element: <Suspense children={<DashboardPage />} />
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
          path: '/example',
          children: [
            { path: '/example/userList', element: <ExampleUserListPage /> },
            {
              path: '/example/tabs/manage',
              element: <Suspense children={<TabsPage />} />
            }
          ]
        },
        {
          path: '/article',
          // element: <ArticleIndexPage />,
          children: [
            {
              index: true,
              element: <Suspense children={<ArticleIndexPage />} />
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
          path: '/badge/dot',
          element: <BlankPage title="红点徽标" />
        },
        {
          path: '/badge/count',
          element: <BlankPage title="数字徽标" />
        },
        {
          path: iframeUrlPrefix,
          element: <Suspense children={<IframePage />} />
        },
        {
          path: '/multilevel/menu/2/3',
          element: <BlankPage title="三级菜单" />
        },

        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    }
  ];
  return routes;
}
