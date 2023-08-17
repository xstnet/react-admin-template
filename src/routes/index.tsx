import React, { lazy } from 'react';

import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Redirect from '@/components/Redirect';

import GlobalLayout from '@/layouts/global';
import PageLoading from '@/components/Loading/PageLoading';

import { UserCenterPage, UserCenterUpdatePage } from '@/pages/UserCenter';
import { BlankPage, ExampleUserListPage } from '@/pages/Example';
import { NotFoundPage } from '@/pages/Error';
import { ArticleCreatePage, ArticleUpdatePage, ArticleCategoryPage } from '@/pages/Article';

import { iframeUrlPrefix } from '@/utils/iframe';
import MenuPermissionPage from '@/pages/Example/Permission/Menu';
import ButtonPermissionPage from '@/pages/Example/Permission/Button';

const TabsPage = lazy(() => import('@/pages/Example/tabs'));
const ArticleIndexPage = lazy(() => import('@/pages/Article/Index/index'));
const LoginPage = lazy(() => import('@/pages/Login'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const IframePage = lazy(() => import('@/pages/Iframe'));

const Suspense: React.FC<React.PropsWithChildren> = ({ children }) => (
  <React.Suspense fallback={<PageLoading />}>{children}</React.Suspense>
);

// todo: 页面错误降级
export function routeRules() {
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
          // 重定向
          element: <Redirect to="/dashboard" />
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
            },
            {
              path: '/example/permission',
              children: [
                {
                  path: '/example/permission/menu',
                  element: <MenuPermissionPage />
                },
                {
                  path: '/example/permission/button',
                  element: <ButtonPermissionPage />
                }
              ]
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
              element: <Suspense children={<ArticleIndexPage />} />
            },
            {
              path: '/article/category',
              element: <ArticleCategoryPage />
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

export const routes = createBrowserRouter(routeRules(), { basename: import.meta.env.BASE_URL });
