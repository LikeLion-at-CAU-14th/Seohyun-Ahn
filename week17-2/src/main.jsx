import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </StrictMode>,
)
// BrowserRouter는 "이 안에서는 라우팅 기능을 쓸 수 있는 환경을 만들어줄게"라고 선언하는 역할