import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import App from './App';
import './global.less';
import '../mock';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#00b96b'
          }
        }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
