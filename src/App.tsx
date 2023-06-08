import GlobalProvider from '@/contexts/Global';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from './routes';

function App() {
  // 自定义loading效果
  useEffect(() => {
    // Spin.setDefaultIndicator(<GlobalLoading />);
  }, []);

  return (
    <GlobalProvider>
      <RouterProvider router={routes} />
    </GlobalProvider>
  );
}

export default App;
