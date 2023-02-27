// import DashboardPage from '@/pages/Dashboard';
import DashboardPage from '@/pages/Dashboard';
import UserPage from '@/pages/User';
import { lazy } from 'react';
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
      element: <UserPage />
    },
    {
      path: '*',
      element: <span>页面不存在~</span>
    }
  ]);
  return routes;
}
