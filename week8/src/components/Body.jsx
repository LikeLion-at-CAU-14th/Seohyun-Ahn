import React from 'react'
import styled from 'styled-components'

const Body = () => {
  return (
    <BodyContainer>
      <KorName>안서현</KorName> 
      <Greeting>Hello, I'm Ahn</Greeting>
    </BodyContainer> //bio 등 직관적으로 이름짓기
  )
}

export default Body

const BodyContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`

// Body.jsx
const KorName = styled.span`
  display: inline-block;
  padding: 4px 16px;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  background: #fff7ed;
  color: #ea580c;
`

const Greeting = styled.p`
  color: #6b7280;
  font-size: 1.2rem;
  margin: 14px 0 18px;
  line-height: 1.6;
`