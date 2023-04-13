import GlobalProvider from '@/contexts/Global';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import DefaultRoutes from './routes';

function App() {
  // 自定义loading效果
  useEffect(() => {
    // Spin.setDefaultIndicator(<GlobalLoading />);
  }, []);

  const routes = createBrowserRouter(DefaultRoutes(), { basename: import.meta.env.BASE_URL });
  return (
    <GlobalProvider>
      <RouterProvider router={routes} />
    </GlobalProvider>
  );
}

export default App;
