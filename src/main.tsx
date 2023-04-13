import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.less';
import '../mock';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
