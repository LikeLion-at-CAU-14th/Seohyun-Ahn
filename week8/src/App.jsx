import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom' // 라우터 컴포넌트 임포트 추가

import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import ContentBox from './components/ContentBox'

import styled from 'styled-components'

const App = () => {
  return (
    <BrowserRouter> {/* 전체를 BrowserRouter로 감싸줌 */}
      <Container>
        <CardBox>
          <Header/>
          <Body />
          <Footer/>

          {/* Routes 안에 ContentBox를 넣어 경로가 바뀔 때마다 다시 그려지게 함 */}
          <Routes>
            {/* 홈 경로("/")일 때는 아무것도 렌더링하지 않음 */}
            <Route path="/" element={null} />

            {/* 그 외 모든 경로(*)에서 ContentBox 컴포넌트를 호출 */}
            <Route path="*" element={<ContentBox />} />
          </Routes>

        </CardBox> 
      </Container> 
    </BrowserRouter>
  ) //화면에 보여주는 역할, 안에 요소들 배치 순서대로 보임
}

export default App;

const Container = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  background: #f9fafb;
`
const CardBox = styled.div`
  background: white; 
  border-radius: 20px; 
  padding: 150px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08)

  max-width: 500px; /* 너비 조절 추가 */
  width: 50%;
`
