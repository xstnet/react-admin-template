import GlobalProvider from '@/contexts/Global';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/default';
import LoginPage from './pages/Login';
import { Spin } from 'antd';
import { useEffect } from 'react';
import GlobalLoading from './components/Loading/GlobalLoading';

function App() {
  // 自定义loading效果
  useEffect(() => {
    // Spin.setDefaultIndicator(<GlobalLoading />);
  }, []);

  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          {/* 无登录态 登录页 */}
          <Route element={<LoginPage />} path="/login" />
          {/* 有登录态 */}
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;
