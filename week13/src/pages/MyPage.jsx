import React from 'react'
import { useUserInfo } from '../context/UserInfoContext';
import { Card, Wrapper, Title } from '../components/layout/common';

const MyPage = () => {
  const { state } = useUserInfo(); // const { state } = useContext(UserInfoContext); 직접 써도되지만, 커스텀 훅 추가해 간결하게 작성

  return (
    <Wrapper>
      <Card>
      <Title>MyPage</Title>
      <h3>회원 정보</h3>

      <p>이름: {state.name}</p>
      <p>이메일: {state.email}</p>
      <p>생년월일: {state.birth}</p>
      <p>성별: {state.gender}</p>
      </Card>
    </Wrapper>
  )
}

export default MyPage