import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderContainer>
      <Avatar>
        <span>❤️</span>
      </Avatar>
      <EngName>Seohyun Ahn</EngName>
    </HeaderContainer>

  )
}

export default Header

const HeaderContainer = styled.div`//import 자동완성가능
  text-align: center;
` 

// Header.jsx

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fff7ed;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 2.5rem;
  }
`

const EngName = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px;
`
