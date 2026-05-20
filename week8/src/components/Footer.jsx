import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom' // 설치 후 link 불러오기 추가

const Footer = () => {
  return (
    <TagList> 
      <Tag to="/major">Major🎓</Tag>
      <Tag to="/interests">Interests✨</Tag>
      <Tag to="/location">Location📍</Tag>
      <Tag to="/contact">Contact📫</Tag>
      <Tag to="/gallery">Gallery📷</Tag>
      <Tag to="/fun-fact">Fun Fact🌼</Tag>
    </TagList> // 각 태그에 이동 경로 지정

  )
}

export default Footer

// Footer
const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
`
const Tag = styled(Link)` //link를 사용하므로 수정
  display: inline-block;
  padding: 4px 12px;
  background: #ffffff;
  color: #374151;
  border-radius: 999px;
  font-size: 1.0rem;
  font-weight: 700;
  text-decoration: none; /* 링크의 밑줄 제거 */

  box-shadow: 0 10px 10px rgba(255, 105, 180, 0.2);
  &:hover {
    background: #fff7ed; /* 마우스를 올렸을 때 효과 */
  }
`