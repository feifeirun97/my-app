import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import './index.scss'
import './assets/fonts/fonts.scss'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#191A29",
        colorTextBase: "#9499C3",
        fontFamily: "'Poppins', 'Lato'",
        fontSize: 11,
        colorBgContainer: "#191A29",
        colorBorder: "#9499C3",
        colorBorderSecondary: "#191A29",
        colorBgElevated: "#1A1B2F"
      },
      components: {
        Modal: {
          titleColor: 'white',
          titleFontSize: 16,
          contentBg: '#1A1B2F'
        },
        Table: {
          borderColor: '#9499C3',
          headerColor: 'white'
        },
      },
    }}>
    <App />
  </ConfigProvider>

);
