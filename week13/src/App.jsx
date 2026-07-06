import React from 'react'
import Layout from './components/layout/Layout'
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import MyPage from './pages/MyPage';

import { UserInfoProvider } from './context/UserInfoContext'; // UserInfoContext는 컴포넌트가 아니라 Context 객체-> JSX 태그처럼 사용할 수 없음


const App = () => {
  return (
    <UserInfoProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
    </UserInfoProvider>
  )
}

export default App
