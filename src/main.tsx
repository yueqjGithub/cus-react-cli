import React from 'react'
import ReactDOM from 'react-dom'
// import '@/style/index.scss'
import App from './App'
// import { ContextProvider } from './store/context'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('content')
)
